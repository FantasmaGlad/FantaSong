export interface Song {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  url: string;
  coverUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverUrl?: string;
}