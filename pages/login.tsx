import { useAnalytics } from '~/components/context/analytics'
import { CHECKOUT_URL, RATE_LIMIT_COUNT } from '~/utils/constants'
import SquigglyLines from '../components/SquigglyLines'
import { useUser } from '@supabase/auth-helpers-react'
import { AnimatePresence, motion } from 'framer-motion'
import UserDropdown from '~/components/user-dropdown'
import { FADE_IN_ANIMATION_SETTINGS } from '~/utils/constants'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import Modal from '~/components/shared/modal'
import { BASE_DOMAIN } from '~/utils/constants'
import { getRedirectURL } from '~/utils/getRedirectUrl'

export default () => {
  const { analytics } = useAnalytics()
  const supabaseClient = useSupabaseClient()
  const redirectURL = getRedirectURL()
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full overflow-hidden shadow-xl md:max-w-xl md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href={BASE_DOMAIN}>
            <Image src="/tv-logo.png" alt="Logo" className="h-10 w-10 rounded-full" width={20} height={20} />
          </a>
          <h3 className="font-display text-2xl font-bold">YoutubeGPT 登録</h3>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <Auth
            supabaseClient={supabaseClient}
            redirectTo={redirectURL}
            localization={{
              variables: {
                sign_up: {
                  social_provider_text: '{{provider}} で登録する',
                },
                sign_in: {
                  social_provider_text: '{{provider}} で登録する',
                },
              },
            }}
            onlyThirdPartyProviders
            // magicLink
            providers={[
              'google',
              //"facebook",
              // "twitter",
            ]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#F17EB8',
                    brandAccent: '#f88dbf',
                    // brandButtonText: "white",
                  },
                },
              },
            }}
          />
        </div>
        <p className="pb-6 text-center text-slate-400">
          クリックしてログインすると、
          <a href="/terms" target="_blank" className="group underline" aria-label="服务条款">
            利用規約
          </a>
          と
          <Link href="/privacy" target="_blank" className="group underline" aria-label="隐私声明">
            プライバシーポリシーを同意する
          </Link>
          。
        </p>
      </div>
    </div>
    // </div>
  )
}
