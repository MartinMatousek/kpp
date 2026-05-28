import { z } from "zod";
import { loadYearData, AVAILABLE_YEARS } from "../src/core/data.js";
import { computeTax, computeFlatTax, calculateVATAmounts } from "../src/core/calculator.js";

const FLAT_RATE_OPTIONS = [30, 40, 60, 80] as const;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id",
};

const TOOLS = [
  {
    name: "calculate_tax",
    description:
      "Vypočítá daň z příjmu, zdravotní a sociální pojistné pro českého podnikatele (OSVČ). " +
      "Vrátí roční i měsíční přehled pro progresivní i paušální daň. netIncome = příjmy - daň - pojistné. " +
      "Calculates Czech income tax, health and social insurance for a self-employed entrepreneur.",
    inputSchema: {
      type: "object",
      properties: {
        year:                { type: "number", description: "Tax year", default: 2026 },
        earnings:            { type: "number", description: "Annual gross earnings in CZK" },
        withVAT:             { type: "boolean", description: "Is earnings VAT-inclusive?", default: false },
        vatRate:             { type: "number", description: "VAT rate: 12 or 21", default: 21 },
        expenses:            { type: "number", description: "Deductible expenses in CZK", default: 0 },
        globalMonths:        { type: "number", description: "Months active (1-12)", default: 12 },
        investmentInsurance: { type: "number", description: "Investment insurance deduction in CZK", default: 0 },
        interestPaid:        { type: "number", description: "Mortgage/loan interest deduction in CZK", default: 0 },
        otherExpenses:       { type: "number", description: "Other non-taxable deductions in CZK", default: 0 },
        flatRate:            { type: "number", description: "Flat-rate expense % (30/40/60/80)", default: 60 },
        expensesAreFlatRate: { type: "boolean", description: "Are expenses flat-rate?", default: false },
        discounts: {
          type: "object",
          properties: {
            taxpayer:            { type: "boolean", default: true },
            taxpayerMonths:      { type: "number", default: 12 },
            spouse:              { type: "boolean", default: false },
            spouseMonths:        { type: "number", default: 12 },
            spouseZTP:           { type: "boolean", default: false },
            disabled:            { type: "boolean", default: false },
            disabledMonths:      { type: "number", default: 12 },
            disabledThree:       { type: "boolean", default: false },
            disabledThreeMonths: { type: "number", default: 12 },
            ztp:                 { type: "boolean", default: false },
            ztpMonths:           { type: "number", default: 12 },
            children:            { type: "boolean", default: false },
            childrenCount:       { type: "number", default: 0 },
            childrenZtpCount:    { type: "number", default: 0 },
            childrenMonths:      { type: "number", default: 12 },
          },
        },
      },
      required: ["earnings"],
    },
  },
];

const InputSchema = z.object({
  year:                z.number().int().refine(y => (AVAILABLE_YEARS as readonly number[]).includes(y)).default(2026),
  earnings:            z.number().min(0),
  withVAT:             z.boolean().default(false),
  vatRate:             z.number().refine(r => [12, 21].includes(r)).default(21),
  expenses:            z.number().min(0).default(0),
  globalMonths:        z.number().int().min(1).max(12).default(12),
  investmentInsurance: z.number().min(0).default(0),
  interestPaid:        z.number().min(0).default(0),
  otherExpenses:       z.number().min(0).default(0),
  flatRate:            z.number().refine(r => (FLAT_RATE_OPTIONS as readonly number[]).includes(r)).default(60),
  expensesAreFlatRate: z.boolean().default(false),
  discounts: z.object({
    taxpayer:            z.boolean().default(true),
    taxpayerMonths:      z.number().int().min(1).max(12).default(12),
    spouse:              z.boolean().default(false),
    spouseMonths:        z.number().int().min(1).max(12).default(12),
    spouseZTP:           z.boolean().default(false),
    disabled:            z.boolean().default(false),
    disabledMonths:      z.number().int().min(1).max(12).default(12),
    disabledThree:       z.boolean().default(false),
    disabledThreeMonths: z.number().int().min(1).max(12).default(12),
    ztp:                 z.boolean().default(false),
    ztpMonths:           z.number().int().min(1).max(12).default(12),
    children:            z.boolean().default(false),
    childrenCount:       z.number().int().min(0).max(20).default(0),
    childrenZtpCount:    z.number().int().min(0).max(20).default(0),
    childrenMonths:      z.number().int().min(1).max(12).default(12),
  }).optional(),
});

function calculateTax(rawInput: unknown): string {
  const input = InputSchema.parse(rawInput);
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
    children:            { enabled: d.children ?? false, count: d.childrenCount ?? 0, ztpCount: d.childrenZtpCount ?? 0 },
    childrenMonths:      d.childrenMonths      ?? 12,
  };

  const prog = computeTax({
    yearData, earningsWithoutVAT,
    expenses: input.expenses, discounts,
    investmentInsurance: input.investmentInsurance,
    interestPaid: input.interestPaid,
    otherExpenses: input.otherExpenses,
    globalMonths: input.globalMonths,
  });
  const flat = computeFlatTax(yearData, earningsWithoutVAT, input.flatRate, input.globalMonths);
  const m = input.globalMonths;
  const progressiveObligations = prog.tax + prog.health + prog.social;

  return JSON.stringify({
    year: input.year,
    earningsWithoutVAT: Math.round(earningsWithoutVAT),
    expenses: { amount: input.expenses, flatRate: input.expensesAreFlatRate ? input.flatRate : null },
    progressive: {
      taxBase: prog.taxBase,
      incomeTax: prog.tax,
      healthInsurance: prog.health,
      socialInsurance: prog.social,
      totalObligations: progressiveObligations,
      netIncome: Math.round(earningsWithoutVAT - progressiveObligations),
      monthly: {
        incomeTax:        Math.round(prog.tax    / m),
        healthInsurance:  Math.round(prog.health / m),
        socialInsurance:  Math.round(prog.social / m),
        totalObligations: Math.round(progressiveObligations / m),
        netIncome:        Math.round((earningsWithoutVAT - progressiveObligations) / m),
      },
    },
    flatRateTax: flat.bandId !== null
      ? { eligible: true, band: flat.bandId, monthly: flat.monthly, yearly: flat.yearly, netIncome: Math.round(earningsWithoutVAT - flat.yearly) }
      : { eligible: false, reason: "Income or expense ratio exceeds flat-rate band limits" },
  }, null, 2);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function handleRpc(body: Record<string, unknown>): Response {
  const { jsonrpc, id, method, params } = body as {
    jsonrpc: string; id: unknown; method: string; params?: Record<string, unknown>;
  };

  const respond = (result: unknown) => json({ jsonrpc, id, result });
  const error = (code: number, message: string) => json({ jsonrpc, id, error: { code, message } });

  if (method === "initialize") {
    return respond({
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "kpp-tax-calculator", version: "1.0.0" },
    });
  }

  if (method === "tools/list") {
    return respond({ tools: TOOLS });
  }

  if (method === "tools/call") {
    const { name, arguments: args } = (params ?? {}) as { name?: string; arguments?: unknown };
    if (name !== "calculate_tax") return error(-32601, `Unknown tool: ${name}`);
    try {
      const text = calculateTax(args);
      return respond({ content: [{ type: "text", text }] });
    } catch (e) {
      return error(-32602, e instanceof Error ? e.message : "Invalid arguments");
    }
  }

  if (method === "notifications/initialized") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  return error(-32601, `Method not found: ${method}`);
}

export const onRequest = async (context: { request: Request }): Promise<Response> => {
  const { request } = context;
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: CORS_HEADERS });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, 400);
  }

  if (Array.isArray(body)) {
    const results = await Promise.all(body.map(async item => {
      try { return await handleRpc(item as Record<string, unknown>).json(); }
      catch { return { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid request" } }; }
    }));
    return json(results);
  }

  return handleRpc(body as Record<string, unknown>);
};
