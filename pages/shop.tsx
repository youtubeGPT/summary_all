import { useAnalytics } from '~/components/context/analytics'
import { CHECKOUT_URL, RATE_LIMIT_COUNT } from '~/utils/constants'
import SquigglyLines from '../components/SquigglyLines'

export default () => {
  const { analytics } = useAnalytics()

  return (
    <div>
      <h2 className="mt-10 max-w-5xl pb-10 text-center text-4xl font-bold sm:text-7xl">
        回数切れです! 1 日に {RATE_LIMIT_COUNT} 回使用できます。
        <span className="relative whitespace-nowrap text-[#3290EE]">
          <SquigglyLines />
          <a
            className="relative text-pink-400 hover:underline"
            href={CHECKOUT_URL}
            onClick={() => analytics.track('ShopLink Clicked')}
          >
            一ヶ月無制限で要約！
          </a>
        </span>
        {/* 回数、💰 */}
        {/* <div className="mt-8">
        また
          <a href="/wechat.jpg" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
          「Wechatに私を追加してください」
          </a>
        </div> */}
      </h2>
      <div className="min-h-screen min-w-fit border-2 border-purple-700">
        <iframe src={CHECKOUT_URL} width="100%" height="1024px"></iframe>
      </div>
    </div>
  )
}
