import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { n: 1, label: 'Info'     },
  { n: 2, label: 'Delivery' },
  { n: 3, label: 'Payment'  },
] as const;

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center py-5">
      {STEPS.map((step, i) => {
        const done   = step.n < currentStep;
        const active = step.n === currentStep;

        return (
          <div key={step.n} className="flex items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300',
                  done   ? 'bg-primary text-white'                            :
                  active ? 'bg-primary text-white ring-4 ring-primary/20'     :
                           'bg-border text-muted'
                )}
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : step.n}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium tracking-wide transition-colors',
                  active ? 'text-primary' : 'text-muted'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-14 h-px mx-1.5 mb-4 transition-colors duration-300',
                  step.n < currentStep ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
