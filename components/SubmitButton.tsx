import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useUser } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export function SubmitButton({ loading }: { loading: boolean }) {
  const [clickCount, setClickCount] = useState(0)
  const router = useRouter()
  const user = useUser()
  const isLoggedIn = () => {
    return user
  }
  const generateRandomUserId = () => {
    return Math.floor(10000000 + Math.random() * 90000000)
  }

  const handleClick = async () => {
    console.log('handleClick')
    setClickCount(clickCount + 1)

    if (clickCount >= 4) {
      // 因为从0开始计数，所以是4
      router.push('/shop')
    }

    if (isLoggedIn() && user) {
      //keywordseverywhere.com/ctl/subscriptions?apiKey=
      // 检查邮箱是否已经存在
      https: const { data: existingUser, error: existingUserError } = await supabase
        .from('UserInfo')
        .select('user_email, LeftCount') // 添加 LeftCount 到查询中
        .eq('user_email', user.email)

      if (existingUserError) {
        console.error('Error fetching user: ', existingUserError)
        return
      }
      if (existingUser && existingUser.length > 0) {
        console.log('existingUser.length', existingUser.length)
        console.log('existingUser.user_email', existingUser[0].user_email)
        console.log('existingUser.LeftCount', existingUser[0].LeftCount)
      }
      // 如果邮箱不存在，插入一条新的记录
      if (existingUser.length === 0) {
        const { data, error } = await supabase.from('UserInfo').insert([
          {
            user_id: generateRandomUserId(),
            user_email: user.email,
            FreeOrPaid: 0,
            UsedCount: 0,
            LeftCount: 10,
            paid_at: null,
            created_at: new Date(),
          },
        ])

        if (error) {
          console.error('Error inserting user: ', error)
        } else {
          console.log('User inserted: ', data)
        }
      } else {
        // 更新 LeftCount 列并检查是否需要跳转到 '/shop'
        const updatedLeftCount = existingUser[0].LeftCount - 1
        console.log('updatedLeftCount', updatedLeftCount)
        if (updatedLeftCount <= 0) {
          router.push('/shop')
        } else {
          const { data: updateData, error: updateError } = await supabase
            .from('UserInfo')
            .update({ LeftCount: updatedLeftCount })
            .eq('user_email', user.email)

          if (updateError) {
            console.error('Error updating LeftCount: ', updateError)
          } else {
            console.log('LeftCount updated: ', updateData)
          }
        }
      }
    } else {
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
