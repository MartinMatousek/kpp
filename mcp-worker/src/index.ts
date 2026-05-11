import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadYearData, AVAILABLE_YEARS } from "../../src/core/data.js";
import { computeTax, computeFlatTax, calculateVATAmounts } from "../../src/core/calculator.js";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Env {}

const FLAT_RATE_OPTIONS = [30, 40, 60, 80] as const;

export class KppMCP extends McpAgent {
  server = new McpServer({ name: "kpp-tax-calculator", version: "1.0.0" });

  async init() {
    this.server.registerTool(
      "calculate_tax",
      {
        description:
          "Vypočítá daň z příjmu, zdravotní a sociální pojistné pro českého podnikatele (OSVČ). " +
          "Vrátí roční i měsíční přehled pro progresivní i paušální daň. netIncome = příjmy - daň - pojistné (výdaje nejsou odečteny). expenses.flatRate uvádí % paušálu pokud byl použit. " +
          "Calculates Czech income tax, health and social insurance for a self-employed entrepreneur. " +
          "Returns annual and monthly breakdown. netIncome = earnings minus tax and insurance only (expenses not deducted). expenses.flatRate shows flat-rate % if used.",
        inputSchema: {
          year: z
            .number().int()
            .refine(y => (AVAILABLE_YEARS as readonly number[]).includes(y), {
              message: `Rok musí být jeden z: ${AVAILABLE_YEARS.join(", ")}`,
            })
            .default(2026)
            .describe("Daňový rok / Tax year"),

          earnings: z.number().min(0)
            .describe("Roční hrubé příjmy v Kč / Annual gross earnings in CZK"),

          withVAT: z.boolean().default(false)
            .describe("Je částka včetně DPH? / Is the earnings figure VAT-inclusive?"),

          vatRate: z
            .number()
            .refine(r => [12, 21].includes(r), { message: "Sazba DPH musí být 12 nebo 21" })
            .default(21)
            .describe("Sazba DPH v % / VAT rate: 12 or 21"),

          expenses: z.number().min(0).default(0)
            .describe("Výdaje v Kč / Deductible business expenses in CZK"),

          globalMonths: z.number().int().min(1).max(12).default(12)
            .describe("Počet měsíců podnikání / Months active as self-employed this year"),

          investmentInsurance: z.number().min(0).default(0)
            .describe("Odpočet životního pojištění v Kč (max 48 000 Kč) / Investment insurance deduction"),

          interestPaid: z.number().min(0).default(0)
            .describe("Odpočet úroků z úvěru v Kč / Mortgage/loan interest deduction"),

          otherExpenses: z.number().min(0).default(0)
            .describe("Ostatní nezdanitelné odpočty v Kč / Other non-taxable deductions"),

          flatRate: z
            .number()
            .refine(r => (FLAT_RATE_OPTIONS as readonly number[]).includes(r), {
              message: `Výdajový paušál musí být: ${FLAT_RATE_OPTIONS.join(", ")}`,
            })
            .default(60)
            .describe("Výdajový paušál % pro posouzení paušální daně / Expense flat-rate % (30/40/60/80)"),

          expensesAreFlatRate: z.boolean().default(false)
            .describe("Jsou zadané výdaje paušální? Pokud ano, zobrazí se flatRate % na výstupu. / Are the expenses flat-rate? If true, flatRate % is shown in output."),

          discounts: z.object({
            taxpayer:             z.boolean().default(true).describe("Sleva na poplatníka"),
            taxpayerMonths:       z.number().int().min(1).max(12).default(12),
            spouse:               z.boolean().default(false).describe("Sleva na manžela/manželku"),
            spouseMonths:         z.number().int().min(1).max(12).default(12),
            spouseZTP:            z.boolean().default(false).describe("Manžel/ka má průkaz ZTP/P"),
            disabled:             z.boolean().default(false).describe("Základní sleva na invaliditu"),
            disabledMonths:       z.number().int().min(1).max(12).default(12),
            disabledThree:        z.boolean().default(false).describe("Rozšířená sleva na invaliditu III. stupně"),
            disabledThreeMonths:  z.number().int().min(1).max(12).default(12),
            ztp:                  z.boolean().default(false).describe("Držitel průkazu ZTP/P"),
            ztpMonths:            z.number().int().min(1).max(12).default(12),
            children:             z.boolean().default(false).describe("Daňové zvýhodnění na děti"),
            childrenCount:        z.number().int().min(0).max(20).default(0).describe("Počet běžných dětí"),
            childrenZtpCount:     z.number().int().min(0).max(20).default(0).describe("Počet dětí s průkazem ZTP"),
            childrenMonths:       z.number().int().min(1).max(12).default(12),
          }).optional(),
        },
      },
      (input) => {
        const yearData = loadYearData(input.year);
        const { earningsWithoutVAT } = calculateVATAmounts(input.earnings, input.withVAT, input.vatRate);
        const d = input.discounts ?? {} as NonNullable<typeof input.discounts>;

        const discounts = {
          taxpayer:            d.taxpayer            ?? true,
          taxpayerMonths:      d.taxpayerMonths      ?? 12,
          spouse:              d.spouse              ?? false,
          spouseMonths:        d.spouseMonths        ?? 12,
          spouseZTP:           d.spouseZTP           ?? false,
          disabled:            d.disabled            ?? false,
          disabledMonths:      d.disabledMonths      ?? 12,
          disabledThree:       d.disabledThree       ?? false,
          disabledThreeMonths: d.disabledThreeMonths ?? 12,
          ztp:                 d.ztp                 ?? false,
          ztpMonths:           d.ztpMonths           ?? 12,
          children: { enabled: d.children ?? false, count: d.childrenCount ?? 0, ztpCount: d.childrenZtpCount ?? 0 },
          childrenMonths:      d.childrenMonths      ?? 12,
        };

        const prog = computeTax({
          yearData,
          earningsWithoutVAT,
          expenses: input.expenses,
          discounts,
          investmentInsurance: input.investmentInsurance,
          interestPaid: input.interestPaid,
          otherExpenses: input.otherExpenses,
          globalMonths: input.globalMonths,
        });
        const flat = computeFlatTax(yearData, earningsWithoutVAT, input.flatRate, input.globalMonths);
        const m = input.globalMonths;

        const progressiveObligations = prog.tax + prog.health + prog.social;
        const result = {
          year: input.year,
          earningsWithoutVAT: Math.round(earningsWithoutVAT),
          expenses: {
            amount: input.expenses,
            flatRate: input.expensesAreFlatRate ? input.flatRate : null,
          },
          progressive: {
            taxBase:          prog.taxBase,
            incomeTax:        prog.tax,
            healthInsurance:  prog.health,
            socialInsurance:  prog.social,
            totalObligations: progressiveObligations,
            netIncome:        Math.round(earningsWithoutVAT - progressiveObligations),
            monthly: {
              incomeTax:        Math.round(prog.tax    / m),
              healthInsurance:  Math.round(prog.health / m),
              socialInsurance:  Math.round(prog.social / m),
              totalObligations: Math.round(progressiveObligations / m),
              netIncome:        Math.round((earningsWithoutVAT - progressiveObligations) / m),
            },
          },
          flatRateTax: flat.bandId !== null
            ? {
                eligible: true,
                band: flat.bandId,
                monthly: flat.monthly,
                yearly: flat.yearly,
                netIncome: Math.round(earningsWithoutVAT - flat.yearly),
              }
            : { eligible: false, reason: "Income or expense ratio exceeds flat-rate band limits" },
        };

        return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
      },
    );
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp") {
      return KppMCP.serve("/mcp").fetch(request, env, ctx);
    }
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({ name: "kpp-tax-calculator", version: "1.0.0", endpoint: "/mcp" }),
        { headers: { "content-type": "application/json" } },
      );
    }
    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
