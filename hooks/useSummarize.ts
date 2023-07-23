import { useState } from 'react'
import { useToast } from '~/hooks/use-toast'
import { UserConfig, VideoConfig } from '~/lib/types'
import { RATE_LIMIT_COUNT } from '~/utils/constants'

export function useSummarize(showSingIn: (show: boolean) => void, enableStream: boolean = true) {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string>('')
  const { toast } = useToast()

  const resetSummary = () => {
    setSummary('')
  }

  const summarize = async (videoConfig: VideoConfig, userConfig: UserConfig) => {
    setSummary('')
    setLoading(true)

    try {
      setLoading(true)
      const response = await fetch('/api/sumup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoConfig,
          userConfig,
        }),
      })

      if (response.redirected) {
        window.location.href = response.url
      }

      if (!response.ok) {
        console.log('error', response)
        if (response.status === 501) {
          toast({
            title: 'ああ？ ビデオの字幕が表示されない ！',
            description: `\n（このビデオは短すぎます...\nまたは、まだ字幕がありません!）`,
          })
        } else if (response.status === 504) {
          toast({
            variant: 'destructive',
            title: `ウェブサイトのトラフィックが多すぎる`,
            description: `1 日あたりの使用量の上限は ${RATE_LIMIT_COUNT} です。`,
          })
        } else if (response.status === 401) {
          toast({
            variant: 'destructive',
            title: `${response.statusText} ログインしてください！`,
            // ReadableStream can't get error message
            // description: response.body
            description: '毎日の回数を使い果たしました。🆓',
          })
          showSingIn(true)
        } else {
          const errorJson = await response.json()
          toast({
            variant: 'destructive',
            title: response.status + ' ' + response.statusText,
            // ReadableStream can't get error message
            description: errorJson.errorMessage,
          })
        }
        setLoading(false)
        return
      }

      if (enableStream) {
        // This data is a ReadableStream
        const data = response.body
        if (!data) {
          return
        }

        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          const chunkValue = decoder.decode(value)
          setSummary((prev) => prev + chunkValue)
        }
        setLoading(false)
        return
      }
      // await readStream(response, setSummary);
      const result = await response.json()
      if (result.errorMessage) {
        setLoading(false)
        toast({
          variant: 'destructive',
          title: 'API リクエストでエラーが発生しました。もう一度お試しください。',
          description: result.errorMessage,
        })
        return
      }
      setSummary(result)
      setLoading(false)
    } catch (e: any) {
      console.error('[fetch ERROR]', e)
      toast({
        variant: 'destructive',
        title: '未知のエラー：',
        description: e.message || e.errorMessage,
      })
      setLoading(false)
    }
  }
  return { loading, summary, resetSummary, summarize }
}
