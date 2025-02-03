import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useMusic } from '@/hooks/useMusic';
import { useEffect, useRef } from 'react';

export const NowPlaying = () => {
  const { currentSong, isPlaying, volume, setIsPlaying } = useMusic();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-gray-800 p-4 animate-slide-up">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-700 rounded"></div>
            <div>
              <h4 className="font-medium">Aucun morceau en cours</h4>
              <p className="text-sm text-gray-400">Sélectionnez un morceau</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors" disabled>
              <SkipBack size={24} />
            </button>
            <button className="w-10 h-10 rounded-full bg-fanta-orange flex items-center justify-center hover:bg-fanta-gradient transition-colors" disabled>
              <Play size={24} fill="white" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors" disabled>
              <SkipForward size={24} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Volume2 size={20} className="text-gray-400" />
            <div className="w-24 h-1 bg-gray-700 rounded-full">
              <div className="w-1/2 h-full bg-fanta-orange rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-gray-800 p-4 animate-slide-up">
      <audio ref={audioRef} src={currentSong.url} />
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-700 rounded">
            {currentSong.coverUrl && (
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>
          <div>
            <h4 className="font-medium">{currentSong.title}</h4>
            <p className="text-sm text-gray-400">{currentSong.artist || "Artiste inconnu"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-fanta-orange flex items-center justify-center hover:bg-fanta-gradient transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={24} fill="white" />
            ) : (
              <Play size={24} fill="white" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-gray-700 rounded-full">
            <div
              className="h-full bg-fanta-orange rounded-full"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};