import { type ReactElement } from "react";
import useShippingContext from "@/hooks/useShippingContext";

interface StepProps {
  label: string;
  isActive: boolean;
}

export default function useProgressBar() {
  const { activeStep } = useShippingContext();

  const Step = ({ label, isActive }: StepProps): ReactElement => (
    <h4
      className={`mb-0 py-2 px-5 sm:py-3 sm:px-6 md:py-4 md:px-7 sm-text rounded-lg font-medium transition ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-primary/30 text-foreground"
      }`}
    >
      {label}
    </h4>
  );

  const renderContent = () => (
    <div className="container flex flex-col" suppressHydrationWarning>
      <div className="flex mt-navbar gap-3 sm:gap-4 md:gap-5 place-self-center">
        <Step
          label="Pengiriman"
          isActive={activeStep === 1 || activeStep === 2 || activeStep === 3}
        />
        <Step
          label="Konfirmasi"
          isActive={activeStep === 2 || activeStep === 3}
        />
        <Step label="Pembayaran" isActive={activeStep === 3} />
      </div>
    </div>
  );

  return renderContent;
}
