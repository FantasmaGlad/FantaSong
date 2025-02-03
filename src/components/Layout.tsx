import React from 'react';
import { Sidebar } from './Sidebar';
import { NowPlaying } from './NowPlaying';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-dark-bg text-dark-text flex">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
      <NowPlaying />
    </div>
  );
};