import { Home, Library, PlusCircle } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-dark-surface p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl font-bold bg-gradient-to-r from-fanta-orange to-fanta-gradient bg-clip-text text-transparent">
          FANTA SONG
        </span>
      </div>
      
      <nav className="space-y-4">
        <a href="/" className="flex items-center gap-3 text-lg hover:text-fanta-orange transition-colors">
          <Home size={24} />
          Home
        </a>
        <a href="/library" className="flex items-center gap-3 text-lg hover:text-fanta-orange transition-colors">
          <Library size={24} />
          Your Library
        </a>
      </nav>

      <div className="mt-8">
        <button className="flex items-center gap-2 text-sm hover:text-fanta-orange transition-colors">
          <PlusCircle size={20} />
          Create Playlist
        </button>
      </div>

      <div className="mt-auto text-sm text-gray-400">
        <p>© 2024 Fanta Song</p>
      </div>
    </div>
  );
};