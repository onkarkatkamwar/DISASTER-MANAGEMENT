import { Loader2 } from "lucide-react";

export function Spinner() {
  return (
    <div className="z-50">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
}