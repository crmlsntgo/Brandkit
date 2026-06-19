'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Choosing colors…',
  'Pairing fonts…',
  'Writing taglines…',
  'Crafting voice…',
  'Designing logo…',
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 space-y-6" role="status" aria-label="Generating brand kit">
      <p className="animate-fade-in text-center text-sm text-text-muted" key={messageIndex}>
        {MESSAGES[messageIndex]}
      </p>
      <div className="skeleton h-8 w-3/4 rounded-lg mx-auto" />
      <div className="skeleton h-4 w-1/2 rounded-lg mx-auto" />
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton aspect-[3/4] rounded-2xl" />
        ))}
      </div>
      <div className="skeleton h-24 w-full rounded-xl" />
      <div className="skeleton h-20 w-full rounded-xl" />
      <span className="sr-only">Loading your brand kit...</span>
    </div>
  );
}
