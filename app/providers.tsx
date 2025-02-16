'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { MantineProvider } from '@mantine/core'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
} 