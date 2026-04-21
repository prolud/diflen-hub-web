'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { X, ListVideo } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ImportPlaylistModal({ onClose }: Props) {
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (playlistUrl: string) => {
      const encoded = encodeURIComponent(playlistUrl);
      const response = await api.post(`/api/unity/import/${encoded}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unities'] });
      toast.success('Playlist importada com sucesso!');
      onClose();
    },
    onError: () => {
      toast.error('Erro ao importar playlist. Verifique o link e tente novamente.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    mutate(url.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-card border rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ListVideo className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">Importar Playlist do YouTube</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Link da playlist</label>
            <Input
              placeholder="https://www.youtube.com/playlist?list=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isPending}
              autoFocus
            />
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!url.trim() || isPending}>
              {isPending ? 'Importando...' : 'Importar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
