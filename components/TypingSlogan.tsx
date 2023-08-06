import { TypeAnimation } from 'react-type-animation'
import SquigglyLines from '~/components/SquigglyLines'

export function TypingSlogan() {
  return (
    <>
      <h1 className="h-[5rem] w-full text-center text-4xl font-bold sm:w-[64rem] sm:text-7xl">
      {' '}
        <span className="relative whitespace-nowrap	text-red-600">
          <SquigglyLines />
          <TypeAnimation
            sequence={[
              'YouTube',
              2000,
              // 'PodCast',
              // 2000,
              // '会議',
              // 2000,
              () => {
                console.log('Done typing!') // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="relative text-red-600	"
          />
        </span>{' '}
        を要約する <br />
      </h1>

      <h1 className="mt-4 w-full text-center text-4xl font-bold sm:w-[64rem] sm:text-7xl">Powered by GPT-3.5 AI</h1>
    </>
  )
}
