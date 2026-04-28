'use client';

import { LoadingScreen } from '@/components/ui/loading-screen';
import { useRequireAuth } from '@/hooks/use-require-auth';

/**
 * Layout do route group `(authenticated)`.
 *
 * Aplica `useRequireAuth` em todas as rotas filhas: enquanto a sessão é
 * carregada (ou se o usuário não estiver autenticado), exibe um spinner
 * de página inteira em vez do conteúdo. Centralizar aqui elimina a
 * duplicação de `useEffect` de redirect em cada página protegida.
 */
export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isReady } = useRequireAuth();

  if (!isReady) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
