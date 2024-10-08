import React, { ReactNode } from "react";
import { Card } from "./ui/card";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

const CardContainer = ({ children, className = "" }: CardContainerProps) => {
  return (
    <Card
      className={`bg-background overflow-hidden box-border rounded-lg shadow ${className}`}
    >
      {children}
    </Card>
  );
};

export default CardContainer;
