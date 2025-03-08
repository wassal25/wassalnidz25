
import React from "react";

export interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Composant de champ de formulaire pour les formulaires d'authentification
 */
const FormField = ({ id, label, type, placeholder, value, onChange, required = false, disabled = false }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-white/90 text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="bg-white/10 border border-white/20 rounded-xl w-full px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300 disabled:opacity-70"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;
