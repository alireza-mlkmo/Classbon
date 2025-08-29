import { ReactNode } from "react";
import { ComponentBase } from "../types/component-base.type";
import { Variant } from "../types/variant.type";

type VariantWithGradient = Omit<ComponentBase , 'variant' | 'isDisabled'>

export type TimerRef = {
    start: () => void;
    pause: () => void;
    resume: () => void;
    restart: (expiryTimestamp: Date) => void;
}


export type TimerProps = VariantWithGradient & {
    variant?: Variant | 'gradient';
    expiryTimestamp: Date;
    autoStart?: boolean;
    showTitle?: boolean;
    showDays?: boolean;
    showHours?: boolean;
    onExpire?: () => void;
}

export type TimerProgressProps = VariantWithGradient & {
  variant?: Variant | "gradient";
  value: number;
  maxValue: number;
  showTitle?: boolean;
  datePart: string;
  children: ReactNode;
}; 