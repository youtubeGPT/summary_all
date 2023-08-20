import { UseFormReturn } from 'react-hook-form/dist/types/form'
import { PROMPT_LANGUAGE_MAP } from '~/utils/constants/language'

export function PromptOptions({
  register,
  getValues,
}: {
  // TODO: add types
  register: any
  getValues: UseFormReturn['getValues']
}) {
  const shouldShowTimestamp = getValues('showTimestamp')
  return (
    <div className="mt-6 grid grid-cols-2 items-center gap-x-10 gap-y-2 md:mt-10 md:grid-cols-3 md:gap-y-6">
      {/* <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" value="" className="peer sr-only" {...register('showTimestamp')} />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-sky-800"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">タイムスタンプを表示するかどうか</span>
      </label> */}
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" {...register('showEmoji')} />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-sky-800"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">絵文字表示</span>
      </label>
      <div>
        <label htmlFor="outputLanguage" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        出力言語
        </label>
        <select
          id="outputLanguage"
          className="block w-full rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
          {...register('outputLanguage')}
        >
          {Object.keys(PROMPT_LANGUAGE_MAP).map((k: string) => (
            <option key={PROMPT_LANGUAGE_MAP[k]} value={PROMPT_LANGUAGE_MAP[k]}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {/* <div>
        <label htmlFor="sentenceNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        ポイント数
          <span className="text-gray-500">(≤{getValues('sentenceNumber')})</span>
        </label>
        <input
          id="sentenceNumber"
          type="range"
          min={3}
          max={10}
          step={1}
          className="h-2 w-full cursor-pointer rounded-lg bg-gray-200 accent-black dark:bg-gray-700"
          {...register('sentenceNumber', {
            valueAsNumber: true,
          })}
        />
      </div> */}
      {/* <div>
        <label htmlFor="outlineLevel" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        アウトラインレベル
          <span className="text-gray-500">(≤{getValues('outlineLevel')})</span>
        </label>
        <input
          id="outlineLevel"
          type="range"
          min={1}
          max={5}
          step={1}
          className="h-2 w-full cursor-pointer rounded-lg bg-gray-200 accent-black dark:bg-gray-700"
          disabled={shouldShowTimestamp}
          {...register('outlineLevel', {
            valueAsNumber: true,
          })}
        />
      </div> */}
      <div>
        <label htmlFor="detailLevel" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        詳細度
          <span className="text-gray-500">(≤{getValues('detailLevel')})</span>
        </label>
        <input
          id="detailLevel"
          type="range"
          min={600}
          max={1000}
          step={200}
          className="h-2 w-full cursor-pointer rounded-lg bg-gray-200 accent-black dark:bg-gray-700"
          {...register('detailLevel', {
            valueAsNumber: true,
          })}
        />
      </div>
    </div>
  )
}
