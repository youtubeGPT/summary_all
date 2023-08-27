import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useUser } from '@supabase/auth-helpers-react'

export function SubmitButton({ loading }: { loading: boolean }) {
  const [clickCount, setClickCount] = useState(0)
  const router = useRouter()
  const user = useUser()
  const isLoggedIn = () => {
    return user
  }
  const handleClick = () => {
    console.log('handleClick')
    setClickCount(clickCount + 1)

    if (clickCount >= 4) {
      // 因为从0开始计数，所以是4
      router.push('/shop')
    }

    if (!isLoggedIn()) {
      console.log('not login')
      router.push('/login')
    }
  }

  if (!loading) {
    return (
      <button
        onClick={handleClick}
        className="z-10 mx-auto mt-7 w-3/4 rounded-2xl border-gray-500 bg-sky-400 p-3 text-lg font-medium text-white transition hover:bg-sky-500 sm:mt-10 sm:w-1/3"
        type="submit"
      >
        要約する
      </button>
    )
  }

  return (
    <button
      className="z-10 mx-auto mt-7 w-3/4 cursor-not-allowed rounded-2xl border-gray-500 bg-sky-400 p-3 text-lg font-medium transition hover:bg-sky-500 sm:mt-10 sm:w-1/3"
      disabled
    >
      <div className="flex items-center justify-center text-white">
        <Image src="/loading.svg" alt="Loading..." width={28} height={28} />
      </div>
    </button>
  )
}
