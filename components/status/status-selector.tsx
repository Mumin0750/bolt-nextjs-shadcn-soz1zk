"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface StatusSelectorProps {
  status: 'Complete' | 'Incomplete';
  onChange: (status: 'Complete' | 'Incomplete') => void;
  disabled?: boolean;
}

export function StatusSelector({ status, onChange, disabled = false }: StatusSelectorProps) {
  return (
    <Select value={status} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger 
        className={cn(
          "w-[180px]",
          status === 'Complete' ? "text-green-600 font-medium" : "text-red-600 font-medium"
        )}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem 
          value="Complete" 
          className="text-green-600 font-medium"
        >
          Complete
        </SelectItem>
        <SelectItem 
          value="Incomplete" 
          className="text-red-600 font-medium"
        >
          Incomplete
        </SelectItem>
      </SelectContent>
    </Select>
  );
}