'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        <Notifications position="top-right" zIndex={1000} />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
} 