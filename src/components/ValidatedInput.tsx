import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface ValidatedInputProps {
  name: string;
  value: string | number;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formSubmitted: boolean;
}

const ValidatedInput = ({ name, value, type, onChange, onBlur, formSubmitted }: ValidatedInputProps) => {
  const [touched, setTouched] = useState<boolean>(false);

  const isEmptyOnSubmit = !value && formSubmitted;
  const handleFocus = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  return (
    <div className={`input-wrapper`}>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={handleFocus}
        className={isEmptyOnSubmit ? "border-red-500" : ""}
      />
    </div>
  );
};

export default ValidatedInput;
