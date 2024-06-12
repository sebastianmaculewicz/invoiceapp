import { Switch } from "./ui/switch";
import { PrintModeSwitchProps } from "@/types";

export default function PrintModeSwitch({ printMode, setPrintMode }: PrintModeSwitchProps) {
  const togglePrintMode = () => {
    setPrintMode(!printMode);
  };

  return (
    <div className="lg:my-0 flex items-center gap-2 mr-5 my-2 justify-center">
      <Switch id="print-mode" checked={printMode} onCheckedChange={togglePrintMode} />
      <label
        htmlFor="print-mode"
        className="text-sm font-semibold cursor-pointer"
      >
        Widok wydruku
      </label>
    </div>
  );
}
