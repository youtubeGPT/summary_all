import { TypeAnimation } from 'react-type-animation'
import SquigglyLines from '~/components/SquigglyLines'

export function TypingSlogan() {
  return (
    <>
      <h1 className="h-[5rem] w-full text-center text-4xl font-bold sm:w-[64rem] sm:text-7xl">
      要約する{' '}
        <span className="relative whitespace-nowrap	text-pink-400">
          <SquigglyLines />
          <TypeAnimation
            sequence={[
              'Bilibili',
              2000,
              'YouTube',
              2000,
              'ポッドキャスト',
              2000,
              'ミーティング',
              2000,
              'ローカルファイル',
              3000,
              () => {
                console.log('Done typing!') // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="relative text-pink-400	"
          />
        </span>{' '}
        オーディオとビデオのコンテンツ <br />
      </h1>

      <h1 className="mt-4 w-full text-center text-4xl font-bold sm:w-[64rem] sm:text-7xl">Powered by GPT-3.5 AI</h1>
    </>
  )
}
