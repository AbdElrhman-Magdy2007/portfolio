import { memo } from "react";
import { useParams } from "next/navigation";
import { InputTypes, Languages } from "@/constants/enums";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import Checkbox from "./checkbox";
import { IFormField } from "@/app/types/app";
import { ValidationError } from "@/app/validations/auth";

// واجهة الخصائص مع دعم التحقق وتخصيص اللغة
interface Props extends Omit<IFormField, "type"> {
  name: string;
  type: InputTypes;
  error?: ValidationError | string;
  label?: string;
  isArabic?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: (isValid: boolean) => void;
}

// مكون FormFields لعرض حقول النموذج بناءً على النوع مع تحسين الأداء
const FormFields = memo(
  ({ type, error, name, label, isArabic, value, onChange, onValidationChange, ...rest }: Props) => {
    // تحديد اللغة بناءً على المعامل أو المسار
    const params = useParams();
    const locale = isArabic ?? (params?.locale === Languages.ARABIC);

    // استخراج الخطأ الخاص بالحقل بشكل موحد
    const fieldError =
      error && typeof error === "object" && name
        ? error[name]?.[0] || ""
        : typeof error === "string"
        ? error
        : undefined;

    // التحقق من صحة الإدخال
    const handleValidation = (inputValue: string) => {
      if (onValidationChange) {
        const isValid = inputValue.length >= 2;
        onValidationChange(isValid);
      }
    };

    // عرض الحقل المناسب بناءً على النوع
    const renderField = (): React.ReactNode => {
      console.log(`[FormFields] Rendering ${name}: type=${type}, value=${value || rest.defaultValue || ""}`);
      switch (type) {
        case InputTypes.EMAIL:
        case InputTypes.TEXT:
        case InputTypes.URL:
          return (
            <TextField
              isArabic={locale}
              name={name}
              label={label}
              type={type === InputTypes.EMAIL ? "email" : type === InputTypes.URL ? "url" : "text"}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(`[TextField] ${name} changed to: ${e.target.value}`);
                onChange?.(e);
                handleValidation(e.target.value);
              }}
              error={fieldError}
              onValidationChange={onValidationChange}
              {...rest}
            />
          );

        case InputTypes.PASSWORD:
          return (
            <PasswordField
              isArabic={locale}
              name={name}
              label={label}
              type="password"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(`[PasswordField] ${name} changed to: ${e.target.value}`);
                onChange?.(e);
                handleValidation(e.target.value);
              }}
              error={fieldError}
              onValidationChange={onValidationChange}
              {...rest}
            />
          );

        case InputTypes.CHECKBOX:
          return (
            <Checkbox
              name={name}
              label={label}
              checked={value === "true" || rest.defaultValue === "true" || false}
              error={fieldError}
              onCheckedChange={(checked) => {
                console.log(`[Checkbox] ${name} changed to: ${checked}`);
                onChange?.({ target: { name, value: checked.toString() } } as React.ChangeEvent<HTMLInputElement>);
                handleValidation(checked.toString());
              }}
              {...rest}
            />
          );

        default:
          console.warn(`Unsupported input type: ${type}`);
          return null;
      }
    };

    return <>{renderField()}</>;
  }
);

// تحديد اسم العرض لتسهيل التصحيح
FormFields.displayName = "FormFields";

export default FormFields;