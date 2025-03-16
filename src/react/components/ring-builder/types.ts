
export interface Step {
  id: string;
  name: string;
  description: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
}