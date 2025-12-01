import React from 'react';
import { LucideProps } from 'lucide-react';

// Definiert den Typ für Lucide Icons
export type IconType = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

export interface ServiceItem {
  title: string;
  description: string;
  icon: IconType;
  highlight?: boolean;
  type?: 'contact' | 'projects';
  links?: Array<{ label: string; url: string }>;
}

export type PageView = 'home' | 'imprint' | 'privacy';