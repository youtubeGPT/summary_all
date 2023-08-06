import { Poppins } from '@next/font/google'
import clsx from 'clsx'
import SignIn from '~/components/SignIn'
import { BASE_DOMAIN } from '~/utils/constants'
const poppins = Poppins({ weight: '800', subsets: ['latin'] })

export default function Header({ showSingIn }: { showSingIn: (show: boolean) => void }) {
  return (
    <header className="supports-backdrop-blur:bg-white/60 max-w-8xl sticky top-0 z-40 mx-auto w-full flex-none border-b border-slate-900/10 bg-white/95 pt-2 backdrop-blur  transition-colors duration-500 dark:border-slate-50/[0.06] dark:border-slate-300/10 dark:bg-transparent lg:z-50 lg:mx-0 lg:border-0 lg:border-b lg:border-slate-900/10 lg:px-8">
      <div className="flex items-center justify-between px-3 sm:px-3">
        <div className="flex items-center space-x-3">
          {/* <a href="https://summary-all-ten.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Image src="/video-off.svg" alt="logo" className="animate-bounce" width={34} height={34} />
          </a> */}
          <a href={BASE_DOMAIN}>
            <h2 className={clsx('text-lg sm:text-2xl', poppins.className)}>
              <span className="text-red-400">YoutubeGPT </span> 
            </h2>
          </a>
          {/* <div
            id="banner"
            className="z-50 mx-4 flex hidden w-auto justify-center border-b border-slate-900/10 py-4 dark:border-slate-300/10 lg:mx-0 lg:block lg:border-0 lg:px-8"
          >
            <a
              className="ml-3 hidden items-center rounded-full bg-sky-400/10 py-1 px-3 text-xs font-medium leading-5 text-sky-600 hover:bg-sky-400/20 dark:text-sky-400 xl:flex"
              href="/release"
              target="_blank"
            >
              <strong className="font-semibold">更新中！</strong>
              <svg
                width="2"
                height="2"
                fill="currentColor"
                aria-hidden="true"
                className="ml-2 text-sky-600 dark:text-sky-400/70"
              >
                <circle cx="1" cy="1" r="1"></circle>
              </svg>
              <span className="ml-2 hidden min-[1372px]:inline">
              GitHub オープンソース プロジェクト 🎉
              </span>
              <svg
                width="3"
                height="6"
                className="ml-3 overflow-visible text-sky-300 dark:text-sky-400"
                aria-hidden="true"
              >
                <path
                  d="M0 0L3 3L0 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex shrink-0 items-center space-x-2 sm:space-x-5">
          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://github.com/MinxZ/summary_all"
                rel="noreferrer noopener"
                target="_blank"
                className="flex items-center space-x-2"
              >
                🔥<span className="hidden pl-1 sm:block"></span>フィードバック
              </a>
            </TooltipTrigger>
            <TooltipContent>どうもありがとうございます！</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <a
                href="javascript:(function(){if (window.location.hostname.includes('bilibili.com') || window.location.hostname.includes('youtube.com')) {window.open(location.href.replace('.com', '.jimmylv_wait_to_change.cn'), '_blank');} else {alert('🔖请进入B站或YouTube视频页面，再来点击书签哦！');}}())"
                rel="noreferrer noopener"
                target="_blank"
                className="flex hidden items-center space-x-2 sm:block"
                aria-label="ブックマーク"
                onClick={() => alert('🔖ブックマークバーにドラッグして、YouTubeビデオページに入り、ブックマークをクリックしてください。')}
              >
                🔖
                <span className="relin-paragraph-target pl-1 text-slate-500">(ブックマーク)</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>🔖ブックマークバーにドラッグしてクリックしてください！</p>
            </TooltipContent>
          </Tooltip>
          <a
            href={BASE_DOMAIN + '/ios'}
            rel="noreferrer noopener"
            target="_blank"
            className="flex items-center space-x-2"
            aria-label="iOS"
          >
            <Image src="/shortcuts.png" alt="logo" width={33} height={33} className="max-w-none" />
            <span className="relin-paragraph-target hidden text-slate-500 sm:block">(iOS)</span>
          </a>
          <a href="https://github.com/youtubeGPT/summary_all" rel="noreferrer noopener" target="_blank" className="">
            <Github width="33" height="33" />
          </a> */}
          {/* Put SignIn buttom to the right of the header. */}
          <SignIn showSingIn={showSingIn} />
        </div>
      </div>
    </header>
  )
}
