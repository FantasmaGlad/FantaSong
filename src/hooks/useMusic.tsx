import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Song, Playlist } from '@/types/music';

interface MusicState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  playlists: Playlist[];
  addPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useMusic = create<MusicState>()(
  persist(
    (set) => ({
      currentSong: null,
      isPlaying: false,
      volume: 1,
      playlists: [],
      addPlaylist: (name) =>
        set((state) => ({
          playlists: [
            ...state.playlists,
            { id: crypto.randomUUID(), name, songs: [], coverUrl: undefined },
          ],
        })),
      addSongToPlaylist: (playlistId, song) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, songs: [...playlist.songs, song] }
              : playlist
          ),
        })),
      setCurrentSong: (song) => set({ currentSong: song }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: 'fanta-song-storage',
    }
  )
);