import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './app/contexts/AuthContext';

const queryClient = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
