import { Switch } from "./ui/switch";
import { PrintModeSwitchProps } from "@/types";

export default function PrintModeSwitch({ printMode, setPrintMode }: PrintModeSwitchProps) {
  const togglePrintMode = () => {
    setPrintMode(!printMode);
  };

  return (
    <div className="flex items-center gap-2 mr-5">
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
