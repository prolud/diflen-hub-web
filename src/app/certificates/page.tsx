'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { CertificateResponse } from '@/types';
import Navbar from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CertificatesPage() {
  const { user } = useAuth();

  const { data: certificates, isLoading } = useQuery<CertificateResponse[]>({
    queryKey: ['certificates'],
    queryFn: async () => {
      const response = await api.get('/api/certificate');
      return response.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Meus Certificados</h1>
          <p className="text-muted-foreground">Aqui você encontra todas as suas conquistas no Diflen Hub.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates?.map((cert) => (
            <Card key={cert.unityName} className="border-2 hover:border-primary/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="w-24 h-24 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {cert.unityName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Concluído em: {format(new Date(cert.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </div>
                <Button className="w-full gap-2" variant="outline" onClick={() => alert('Download do PDF em desenvolvimento...')}>
                  <Download className="w-4 h-4" /> Baixar Certificado
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates?.length === 0 && (
          <div className="text-center py-20 bg-card rounded-2xl border-2 border-dashed">
            <Award className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nenhum certificado ainda</h2>
            <p className="text-muted-foreground mb-6">Complete as unidades e responda aos questionários para ganhar seus certificados.</p>
            <Button asChild>
              <Link href="/">Começar a Aprender</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

import Link from 'next/link';
