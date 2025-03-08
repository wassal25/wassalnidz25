
import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Champ de formulaire standardisé pour les pages d'authentification
 */
export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-white/90 text-sm font-medium mb-2 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;
