'use client';

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system"
      enableSystem={true} 
      {...props}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </NextThemesProvider>
  );
}