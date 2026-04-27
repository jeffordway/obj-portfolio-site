'use client'

import { useEffect } from 'react'
import { Text } from '@/components/ui/typography/Text'
import { Button } from '@/components/ui/button/Button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center max-w-md">
            <Text variant="title" className="mb-4">
              Something went wrong
            </Text>
            <Text variant="body" className="mb-6 text-foreground/80">
              We apologize for the inconvenience. An unexpected error has occurred.
            </Text>
            <Button
              onClick={() => reset()}
              variant="primary"
              size="lg"
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
