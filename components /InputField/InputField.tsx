import React, { useState } from "react";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  type?: "text" | "password";
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  type = "text",
  variant = "outlined",
  size = "md",
  clearable,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-1 text-sm rounded-md",
    md: "px-3 py-2 text-base rounded-lg",
    lg: "px-4 py-3 text-lg rounded-xl",
  }[size];

  // Variant classes
  const variantClasses = {
    filled: "bg-gray-100 border-transparent focus:bg-white",
    outlined: "border border-gray-300",
    ghost: "border-none bg-transparent",
  }[variant];

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`
            w-full focus:outline-none focus:ring-2 transition pr-10
            ${sizeClasses} ${variantClasses}
            ${
              invalid
                ? "border-red-500 focus:ring-red-500"
                : "focus:border-blue-500 focus:ring-blue-500"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}
          `}
        />

        {/* Clear button */}
        {clearable && value && !disabled && !loading && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.preventDefault();
              onChange?.({ target: { value: "" } } as any);
            }}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && !disabled && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-500" />
        )}
      </div>

      {/* Messages */}
      {helperText && !invalid && (
        <p className="text-gray-500 text-sm">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-red-500 text-sm mt-1 italic">{errorMessage}</p>
      )}
    </div>
  );
};
