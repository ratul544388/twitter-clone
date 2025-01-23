import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = ({ label, className, ...props } : TextareaProps) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inputHeight, setInputHeight] = React.useState<number>()
  const value = props.value;

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      setInputHeight(inputRef.current.offsetHeight)
    }
  }, [props.value]);

  return (
    <div className="relative">
      <textarea
        className={cn(
          "peer flex overflow-y-hidden resize-none w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          inputHeight && inputHeight > 50 && "rounded-xl",
          inputHeight && inputHeight > 100 && "overflow-y-auto"
        )}
        rows={1}
        ref={inputRef}
        {...props}
      />
      <span
        className={cn(
          "absolute pointer-events-none left-1.5 top-3 px-2 text-sm text-muted-foreground peer-focus:bg-background transition-all peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary",
          value && "top-[-10px] text-xs bg-background",
        )}
      >
        {label}
      </span>
    </div>
  );
}