import { useTranslation } from "react-i18next";
import type { UseFormSetValue } from "react-hook-form";
import Discount from "./Discount";
import AdditionalInfo from "./AdditionalInfo";
import ChildInput from "./ChildInput";
import type { FormData } from "../types/FormData";
import {
  ChildrenInputContainer,
  ChildrenInputContainerHidden,
  HiddenInput,
} from "../styles/AppLayout.styles";
import {
  MAX_CHILDREN,
  CHILD_CARE_AGE_LIMIT,
} from "../AppConstants";

interface DiscountSectionProps {
  formValues: FormData;
  setValue: UseFormSetValue<FormData>;
}

export default function DiscountSection({ formValues, setValue }: DiscountSectionProps) {
  const { t } = useTranslation("form");
  return (
    <>
      <h2>{t("discountsHeading")}</h2>
      <Discount
        isChecked={formValues.taxpayerDiscount}
        setIsChecked={(value) =>
          setValue("taxpayerDiscount", typeof value === "function" ? value(formValues.taxpayerDiscount) : value)
        }
        text={t("taxpayerDiscount")}
        months={formValues.taxpayerDiscountMonths}
        setMonths={(n) => setValue("taxpayerDiscountMonths", n)}
        maxMonths={formValues.globalMonths}
      />
      <Discount
        isChecked={formValues.spouseDiscount}
        setIsChecked={(value) =>
          setValue("spouseDiscount", typeof value === "function" ? value(formValues.spouseDiscount) : value)
        }
        text={t("spouseDiscount", { age: CHILD_CARE_AGE_LIMIT })}
        months={formValues.spouseDiscountMonths}
        setMonths={(n) => setValue("spouseDiscountMonths", n)}
        maxMonths={formValues.globalMonths}
      />
      {formValues.spouseDiscount ? (
        <AdditionalInfo
          isChecked={formValues.spouseZTPDiscount}
          setIsChecked={(value) =>
            setValue("spouseZTPDiscount", typeof value === "function" ? value(formValues.spouseZTPDiscount) : value)
          }
          text={t("spouseZTP")}
        />
      ) : (
        <HiddenInput>
          <AdditionalInfo
            isChecked={false}
            setIsChecked={() => {}}
            text={t("spouseZTP")}
          />
        </HiddenInput>
      )}
      <Discount
        isChecked={formValues.disabledDiscount}
        setIsChecked={(value) => {
          const checked = typeof value === "function" ? value(formValues.disabledDiscount) : value;
          setValue("disabledDiscount", checked);
          if (checked) setValue("disabledThreeDiscount", false);
        }}
        text={t("disabledDiscount12")}
        months={formValues.disabledDiscountMonths}
        setMonths={(n) => setValue("disabledDiscountMonths", n)}
        maxMonths={formValues.globalMonths}
      />
      <Discount
        isChecked={formValues.disabledThreeDiscount}
        setIsChecked={(value) => {
          const checked = typeof value === "function" ? value(formValues.disabledThreeDiscount) : value;
          setValue("disabledThreeDiscount", checked);
          if (checked) setValue("disabledDiscount", false);
        }}
        text={t("disabledDiscount3")}
        months={formValues.disabledThreeDiscountMonths}
        setMonths={(n) => setValue("disabledThreeDiscountMonths", n)}
        maxMonths={formValues.globalMonths}
      />
      <Discount
        isChecked={formValues.ztpDiscount}
        setIsChecked={(value) =>
          setValue("ztpDiscount", typeof value === "function" ? value(formValues.ztpDiscount) : value)
        }
        text={t("ztpDiscount")}
        months={formValues.ztpDiscountMonths}
        setMonths={(n) => setValue("ztpDiscountMonths", n)}
        maxMonths={formValues.globalMonths}
      />
      <Discount
        isChecked={formValues.childrenDiscount}
        setIsChecked={(value) =>
          setValue("childrenDiscount", typeof value === "function" ? value(formValues.childrenDiscount) : value)
        }
        text={t("childDiscount")}
        months={formValues.childrenDiscountMonths}
        setMonths={(n) => setValue("childrenDiscountMonths", n)}
        maxMonths={formValues.globalMonths}
      />
      {formValues.childrenDiscount ? (
        <ChildrenInputContainer>
          <ChildInput
            number={formValues.numberOfChildren}
            setNumber={(value) =>
              setValue("numberOfChildren", typeof value === "function" ? value(formValues.numberOfChildren) : value)
            }
            text={t("numberOfChildren")}
            maxNumber={MAX_CHILDREN}
          />
          <ChildInput
            number={formValues.numberOfZtpChildren}
            setNumber={(value) =>
              setValue("numberOfZtpChildren", typeof value === "function" ? value(formValues.numberOfZtpChildren) : value)
            }
            text={t("ofWhichZTP")}
            maxNumber={formValues.numberOfChildren}
          />
        </ChildrenInputContainer>
      ) : (
        <ChildrenInputContainerHidden>
          <ChildInput
            number={formValues.numberOfChildren}
            setNumber={(value) =>
              setValue("numberOfChildren", typeof value === "function" ? value(formValues.numberOfChildren) : value)
            }
            text={t("numberOfChildren")}
            maxNumber={MAX_CHILDREN}
          />
          <ChildInput
            number={formValues.numberOfZtpChildren}
            setNumber={(value) =>
              setValue("numberOfZtpChildren", typeof value === "function" ? value(formValues.numberOfZtpChildren) : value)
            }
            text={t("ofWhichZTP")}
            maxNumber={formValues.numberOfChildren}
          />
        </ChildrenInputContainerHidden>
      )}
    </>
  );
}
