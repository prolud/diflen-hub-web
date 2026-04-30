import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  className?: string;
}

/**
 * Spinner de página inteira usado por rotas e queries em estado de carregamento.
 *
 * Centraliza o padrão `min-h-screen` + `Loader2` animado para manter a UX
 * consistente entre páginas autenticadas, layouts e fallbacks de rota.
 *
 * @param className - Classes extras opcionais aplicadas ao container.
 */
export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-screen',
        className,
      )}
    >
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
    </div>
  );
}
