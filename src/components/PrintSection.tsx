import PrintInvoiceButton from "./PrintInvoiceButton";
import PrintModeSwitch from "./PrintModeSwitch";

export default function PrintSection({
  printMode,
  setPrintMode,
  isFormSaved,
}: {
  printMode: boolean;
  setPrintMode: React.Dispatch<React.SetStateAction<boolean>>;
  isFormSaved: boolean;
}) {
  return (
    <>
      {typeof printMode != "undefined" && setPrintMode && (
        <PrintModeSwitch printMode={printMode} setPrintMode={setPrintMode} />
      )}
      {typeof isFormSaved != "undefined" && setPrintMode && (
        <PrintInvoiceButton
          isFormSaved={isFormSaved}
          setPrintMode={setPrintMode}
        />
      )}
    </>
  );
}
