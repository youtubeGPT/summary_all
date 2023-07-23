import Link from 'next/link'
import { SaveNoteButton } from '~/components/SaveNoteButton'
import { useSaveToFlomo } from '~/hooks/notes/flomo'
import useSaveToLark from '~/hooks/notes/lark'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export function ActionsAfterResult({
  curVideo,
  onCopy,
  summaryNote,
}: {
  curVideo: string
  summaryNote: string
  onCopy: () => void
}) {
  const [flomoWebhook] = useLocalStorage<string>('user-flomo-webhook')
  const [larkWebhook] = useLocalStorage<string>('user-lark-webhook')
  const { loading: flomoLoading, save: flomoSave } = useSaveToFlomo(summaryNote, curVideo, flomoWebhook || '')
  const { loading: larkLoading, save: larkSave } = useSaveToLark(summaryNote, curVideo, larkWebhook || '')
  const hasNoteSetting = flomoWebhook || larkWebhook

  return (
    <div className="mx-auto mt-7 flex max-w-3xl flex-row-reverse gap-x-4">
      <a
        className="flex w-32 cursor-pointer items-center justify-center rounded-lg bg-pink-400 px-2 py-1 text-center font-medium text-white hover:bg-pink-400/80"
        href="https://space.bilibili.com/37648256"
        target="_blank"
        rel="noopener noreferrer"
      >
        （フォローしてください 😛）
      </a>
      <a
        href={curVideo}
        className="flex w-24 cursor-pointer items-center justify-center rounded-lg bg-sky-400 px-2 py-1 text-center font-medium text-white hover:bg-sky-400/80"
        target="_blank"
        rel="noreferrer"
      >
        ビデオに戻る
      </a>
      <button
        className="w-24 cursor-pointer rounded-lg bg-sky-400 px-2 py-1 text-center font-medium text-white hover:bg-sky-400/80"
        onClick={onCopy}
      >
        コピー
      </button>
      {!hasNoteSetting ? (
        <Link
          className="flex w-44 cursor-pointer items-center justify-center rounded-lg bg-green-400 px-2 py-1 text-center font-medium text-white hover:bg-green-400/80"
          href="/user/integration"
          target="_blank"
        >
          📒 メモに保存
        </Link>
      ) : (
        <>
          {flomoWebhook && <SaveNoteButton onSave={flomoSave} loading={flomoLoading} text="一键保存到 Flomo" />}
          {larkWebhook && <SaveNoteButton onSave={larkSave} loading={larkLoading} text="推送给飞书 Webhook" />}
        </>
      )}
    </div>
  )
}
