import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export type PageView = 'home' | 'imprint' | 'privacy';