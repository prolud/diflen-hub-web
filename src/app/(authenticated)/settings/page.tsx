'use client';

import { useState } from 'react';
import { UserRole } from '@/types';
import { useRequireRole } from '@/hooks/use-require-auth';
import Navbar from '@/components/layout/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListVideo, Loader2 } from 'lucide-react';
import ImportPlaylistModal from '@/components/settings/import-playlist-modal';

export default function SettingsPage() {
  const { isReady } = useRequireRole(UserRole.Admin);
  const [showImportModal, setShowImportModal] = useState(false);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Configurações de Conteúdos</h1>
          <p className="text-muted-foreground">Gerencie e importe conteúdos para a plataforma.</p>
        </header>

        <section>
          <h2 className="text-lg font-semibold mb-4">Importar conteúdo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ListVideo className="w-5 h-5 text-red-500" />
                  <CardTitle className="text-base">Playlist do YouTube</CardTitle>
                </div>
                <CardDescription>
                  Importe vídeos de uma playlist do YouTube como uma nova unidade de treinamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setShowImportModal(true)}>
                  Importar playlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {showImportModal && <ImportPlaylistModal onClose={() => setShowImportModal(false)} />}
    </div>
  );
}
