'use client';

import { PropsWithChildren } from 'react';

export function Reveal({ children }: PropsWithChildren) {
  return <div className="animate-[fadeIn_0.6s_ease]">{children}</div>;
}
