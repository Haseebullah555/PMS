import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../custom/persian_fa";
import { useTranslation } from "react-i18next";

interface DateFieldProps {
    labelId: string;
    name: string;
    value: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    required?: boolean;
    className?: string;
    touched?: boolean;
    error?: string;
    minDate?: any;
    maxDate?: any;
}

const DateField: React.FC<DateFieldProps> = ({
    labelId,
    name,
    value,
    onChange,
    onBlur,
    required,
    className = "col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mt-3",
    touched = false,
    error,
    minDate,
    maxDate,
}) => {
    const { t } = useTranslation();

    const [theme, setTheme] = useState<string | null>("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("vexeldarktheme");
        if (storedTheme) setTheme(storedTheme);
    }, []);

    /* ✅ Formik error logic */
    const isInvalid = !!(touched && error);

    let style = {
        width: "100%",
        height: "42px",
        boxSizing: "border-box",
        backgroundColor: theme === "dark" ? "#1E1E2F" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        border: isInvalid
            ? "1px solid #f64e60"
            : "1px solid " + (theme === "dark" ? "#555" : "#ced4da"),
        borderRadius: "4px",
        padding: "0 10px",
    }

    return (
        <div className={className}>
            {/* label */}
            <label className="form-label">
                <span className="fw-600">{t(labelId)}</span>
                {required && <span className="text-danger">*</span>}
            </label>

            {/* DatePicker */}
            <DatePicker
                editable={false}
                calendar={persian}
                locale={persian_fa} // keep your locale (date format already fixed)
                format="YYYY-MM-DD"
                value={value}
                name={name}
                minDate={minDate}
                maxDate={maxDate}
                containerStyle={{ width: "100%", direction: "rtl" }}
                style={{
                    width: "100%",
                    height: "42px",
                    boxSizing: "border-box",
                    backgroundColor: theme === "dark" ? "#1E1E2F" : "dark",
                    color: theme === "dark" ? "#fff" : "#000",
                    border: isInvalid
                        ? "1px solid #f64e60"
                        : "1px solid " + (theme === "dark" ? "#555" : "#ced4da"),
                    borderRadius: "4px",
                    padding: "0 10px",
                }}
                className={isInvalid ? "border border-danger" : ""}
                onClose={() => onBlur({ target: { name } })}
                onChange={(e) => {
                    onChange({
                        target: {
                            name,
                            value: e
                                ? `${e.year}-${String(e.month.number).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`
                                : "",
                        },
                    });
                }}
            />

            {/* ✅ Error message */}
            {isInvalid && (
                <div className="invalid-feedback d-block">
                    {/* {t(error)} */}
                    {t('validation.required', { name: t(labelId) })}
                </div>
            )}
        </div>
    );
};

export default DateField;
