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
  return (
    <>
      <h2>Slevy na dani</h2>
      <Discount
        isChecked={formValues.taxpayerDiscount}
        setIsChecked={(value) =>
          setValue(
            "taxpayerDiscount",
            typeof value === "function"
              ? value(formValues.taxpayerDiscount)
              : value
          )
        }
        text="Sleva na poplatníka"
      />
      <Discount
        isChecked={formValues.spouseDiscount}
        setIsChecked={(value) =>
          setValue(
            "spouseDiscount",
            typeof value === "function"
              ? value(formValues.spouseDiscount)
              : value
          )
        }
        text={`Sleva na manžela/manželku pečující o dítě do ${CHILD_CARE_AGE_LIMIT} let`}
      />
      {formValues.spouseDiscount ? (
        <AdditionalInfo
          isChecked={formValues.spouseZTPDiscount}
          setIsChecked={(value) =>
            setValue(
              "spouseZTPDiscount",
              typeof value === "function"
                ? value(formValues.spouseZTPDiscount)
                : value
            )
          }
          text="Manžel/manželka se ZTP/P"
        />
      ) : (
        <HiddenInput>
          <AdditionalInfo
            isChecked={false}
            setIsChecked={() => {}}
            text="Manžel/manželka se ZTP/P"
          />
        </HiddenInput>
      )}
      <Discount
        isChecked={formValues.disabledDiscount}
        setIsChecked={(value) => {
          const checked =
            typeof value === "function"
              ? value(formValues.disabledDiscount)
              : value;
          setValue("disabledDiscount", checked);
          if (checked) setValue("disabledThreeDiscount", false);
        }}
        text="Sleva pro invalidní důchod I. a II. Stupně"
      />
      <Discount
        isChecked={formValues.disabledThreeDiscount}
        setIsChecked={(value) => {
          const checked =
            typeof value === "function"
              ? value(formValues.disabledThreeDiscount)
              : value;
          setValue("disabledThreeDiscount", checked);
          if (checked) setValue("disabledDiscount", false);
        }}
        text="Sleva pro invalidní důchod III. Stupně"
      />
      <Discount
        isChecked={formValues.ztpDiscount}
        setIsChecked={(value) =>
          setValue(
            "ztpDiscount",
            typeof value === "function"
              ? value(formValues.ztpDiscount)
              : value
          )
        }
        text="Sleva pro držitele průkazu ZTP/P"
      />
      <Discount
        isChecked={formValues.childrenDiscount}
        setIsChecked={(value) =>
          setValue(
            "childrenDiscount",
            typeof value === "function"
              ? value(formValues.childrenDiscount)
              : value
          )
        }
        text="Sleva na dítě/děti"
      />
      {formValues.childrenDiscount ? (
        <ChildrenInputContainer>
          <ChildInput
            number={formValues.numberOfChildren}
            setNumber={(value) =>
              setValue(
                "numberOfChildren",
                typeof value === "function"
                  ? value(formValues.numberOfChildren)
                  : value
              )
            }
            text="Počet dětí"
            maxNumber={MAX_CHILDREN}
          />
          <ChildInput
            number={formValues.numberOfZtpChildren}
            setNumber={(value) =>
              setValue(
                "numberOfZtpChildren",
                typeof value === "function"
                  ? value(formValues.numberOfZtpChildren)
                  : value
              )
            }
            text="Z toho ZTP/P"
            maxNumber={formValues.numberOfChildren}
          />
        </ChildrenInputContainer>
      ) : (
        <ChildrenInputContainerHidden>
          <ChildInput
            number={formValues.numberOfChildren}
            setNumber={(value) =>
              setValue(
                "numberOfChildren",
                typeof value === "function"
                  ? value(formValues.numberOfChildren)
                  : value
              )
            }
            text="Počet dětí"
            maxNumber={MAX_CHILDREN}
          />
          <ChildInput
            number={formValues.numberOfZtpChildren}
            setNumber={(value) =>
              setValue(
                "numberOfZtpChildren",
                typeof value === "function"
                  ? value(formValues.numberOfZtpChildren)
                  : value
              )
            }
            text="Z toho ZTP/P"
            maxNumber={formValues.numberOfChildren}
          />
        </ChildrenInputContainerHidden>
      )}
    </>
  );
}