import React from 'react';
import type { LucideProps } from 'lucide-react';

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

// Dummy export to ensure this file is treated as a module and not elided during build
export const RuntimeTypes = {};