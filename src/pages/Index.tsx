import { Layout } from "@/components/Layout";
import { ImportSong } from "@/components/ImportSong";
import { useMusic } from "@/hooks/useMusic";
import { PlusCircle, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const { playlists, addPlaylist, addSongToPlaylist, setCurrentSong } = useMusic();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      addPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Bienvenue sur Fanta Song</h1>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer une playlist
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle Playlist</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 items-center mt-4">
                  <Input
                    placeholder="Nom de la playlist"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <Button onClick={handleCreatePlaylist}>Créer</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Music className="mr-2 h-4 w-4" />
                  Importer un morceau
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importer un morceau</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="mb-4">
                    <h3 className="mb-2 font-medium">Choisir une playlist</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {playlists.map((playlist) => (
                        <Button
                          key={playlist.id}
                          variant={selectedPlaylistId === playlist.id ? "default" : "outline"}
                          onClick={() => setSelectedPlaylistId(playlist.id)}
                          className="justify-start"
                        >
                          {playlist.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {selectedPlaylistId && (
                    <ImportSong
                      onImport={(song) => {
                        addSongToPlaylist(selectedPlaylistId, song);
                        setSelectedPlaylistId(null);
                      }}
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="p-4 bg-dark-surface rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
            >
              <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <Music className="h-12 w-12 text-gray-500 group-hover:text-fanta-orange transition-colors" />
              </div>
              <h3 className="font-medium">{playlist.name}</h3>
              <p className="text-sm text-gray-400">
                {playlist.songs.length} morceau{playlist.songs.length !== 1 ? 'x' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;