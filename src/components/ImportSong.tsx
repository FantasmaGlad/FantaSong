import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Song } from '@/types/music';

export const ImportSong = ({ onImport }: { onImport: (song: Song) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', resolve);
      });

      const song: Song = {
        id: crypto.randomUUID(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        duration: Math.round(audio.duration),
        url: url,
      };

      onImport(song);
    } catch (error) {
      console.error("Impossible d'importer le fichier audio:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Sélectionner un fichier audio
      </Button>
    </div>
  );
};