import { ReactNode } from "react";

export interface Step {
  id: string;
  name: string;
  description: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
  icon: ReactNode;
}
