'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isReady } = useRequireAuth();

  return <>{children}</>;
}
