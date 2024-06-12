import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { validateNIP, validateStreetAddress, validateZipCode } from "@/lib/utils";
import { toast } from "sonner";

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
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const isEmptyOnSubmit = !value && formSubmitted;
  const handleFocus = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  const handlePersonalDataBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;


      if(key === "sellerZipcode" && !validateZipCode(value)) {
        toast.error("Błędny format kodu pocztowego sprzedawcy", {
          description: "Spodziewany: XX-XXX"
        })

        setIsInvalid(true);
        return;
      }

      if(key === "buyerZipcode" && !validateZipCode(value)) {
        toast.error("Błędny format kodu pocztowego nabywcy", {
          description: "Spodziewany: XX-XXX"
        })

        setIsInvalid(true);
        return;
      }

      if(key === "sellerNIP" && !validateNIP(value)) {
        toast.error("Błędny format NIP sprzedawcy");

        setIsInvalid(true);
        return;
      }

      if(key === "buyerNIP" && !validateNIP(value)) {
        toast.error("Błędny format NIP nabywcy");

        setIsInvalid(true);
        return;
      }

      if(key === "sellerStreetWithNumber" && !validateStreetAddress(value)) {
        toast.error("Błędny adres sprzedawcy", {
          description: "Podaj nazwę ulicy i numer"
        });

        setIsInvalid(true);
        return;
      }

      if(key === "buyerStreetWithNumber" && !validateStreetAddress(value)) {
        toast.error("Błędny adres nabywcy", {
          description: "Podaj nazwę ulicy i numer"
        });

        setIsInvalid(true);
        return;
      }

      setIsInvalid(false);
  };

  return (
    <div className={`input-wrapper`}>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur ? onBlur :handlePersonalDataBlur}
        onFocus={handleFocus}
        className={(isEmptyOnSubmit || isInvalid) ? "border-red-500" : ""}
      />
    </div>
  );
};

export default ValidatedInput;
