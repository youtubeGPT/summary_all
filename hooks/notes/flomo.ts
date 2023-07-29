import { useState } from 'react'
import { useAnalytics } from '~/components/context/analytics'
import { useToast } from '~/hooks/use-toast'

export function useSaveToFlomo(note: string, video: string, webhook: string) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { analytics } = useAnalytics()

  const save = async () => {
    setLoading(true)
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `${note}\n\nオリジナルビデオ：${video}\n#YoutubeGPT`,
      }),
    })
    const json = await response.json()
    console.log('========response========', json)
    if (!response.ok || json.code === -1) {
      console.log('error', response)
      toast({
        variant: 'destructive',
        title: response.status.toString(),
        description: json.message,
      })
    } else {
      toast({
        title: response.status.toString(),
        description: '正常に保存！ Flomo にアクセスして確認してください。',
      })
    }
    setLoading(false)
    analytics.track('SaveFlomoButton Clicked')
  }
  return { save, loading }
}
