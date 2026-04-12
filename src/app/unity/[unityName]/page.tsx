'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { GetLessonsResponse, UnityResponse } from '@/types';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, PlayCircle, Lock, Award, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';

export default function UnityPage() {
  const params = useParams();
  const unityNameParam = params.unityName as string;
  const unityName = unityNameParam.replace(/-/g, ' ');
  
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [issuing, setIssuing] = useState(false);

  const { data: unityDetails, isLoading: unityLoading } = useQuery<UnityResponse>({
    queryKey: ['unity', unityName],
    queryFn: async () => {
      const response = await api.get(`/api/unity/${unityName}`);
      return response.data;
    },
    enabled: !!unityName && !!user,
  });

  const { data: lessons, isLoading: lessonsLoading } = useQuery<GetLessonsResponse[]>({
    queryKey: ['lessons', unityName],
    queryFn: async () => {
      const response = await api.get(`/api/lesson/list/${unityName}`);
      return response.data;
    },
    enabled: !!unityName && !!user,
  });

  const issueCertificate = async () => {
    setIssuing(true);
    try {
      const response = await api.post(`/api/certificate/issue?unityName=${unityName}`);
      alert('Certificado emitido com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['unity', unityName] });
      router.push('/certificates');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Falha ao emitir certificado. Verifique se concluiu todas as aulas e questionários.');
    } finally {
      setIssuing(false);
    }
  };

  if (unityLoading || lessonsLoading) {
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
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Link href="/" className="text-sm text-primary hover:underline">← Voltar para unidades</Link>
            <h1 className="text-4xl font-extrabold tracking-tight">{unityName}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {unityDetails?.description || 'Explore as aulas desta unidade e complete os desafios.'}
            </p>
          </div>
          
          {unityDetails?.wasAllQuestionsCorrectlyAnswered && (
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl flex flex-col items-center gap-3">
              <Award className="w-12 h-12 text-primary" />
              <div className="text-center">
                <p className="text-sm font-medium mb-3">Parabéns! Você concluiu esta unidade.</p>
                <Button 
                  onClick={issueCertificate} 
                  disabled={issuing || unityDetails.wasCertificateAlreadyIssued}
                  className="w-full shadow-lg shadow-primary/20"
                >
                  {issuing ? 'Emitindo...' : unityDetails.wasCertificateAlreadyIssued ? 'Certificado Emitido' : 'Emitir Certificado'}
                </Button>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-2xl font-bold mb-4">Cronograma de Aulas</h2>
          {lessons?.map((lesson, index) => (
            <Card key={lesson.title} className={`border-2 transition-all hover:border-primary/40 ${lesson.concluded ? 'bg-secondary/20 border-green-500/20' : ''}`}>
              <CardContent className="p-0">
                <Link 
                  href={`/unity/${unityNameParam}/lesson/${lesson.title.replace(/\s+/g, '-')}`}
                  className="flex items-center p-4 sm:p-6 gap-4 sm:gap-6 group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors ${lesson.concluded ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    {lesson.concluded ? <CheckCircle2 className="w-8 h-8" /> : index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold truncate group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant={lesson.concluded ? "default" : "secondary"} className={lesson.concluded ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/10" : ""}>
                        {lesson.concluded ? 'Concluída' : 'Pendente'}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> Assistir aula
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button size="icon" variant="ghost" className="rounded-full group-hover:bg-primary/10 group-hover:text-primary">
                      <PlayCircle className="w-8 h-8" />
                    </Button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}

          {lessons?.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-xl border-2 border-dashed">
              <Loader2 className="w-12 h-12 mx-auto text-muted-foreground/30 animate-pulse mb-4" />
              <p className="text-muted-foreground">Carregando aulas ou nenhuma aula disponível.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
