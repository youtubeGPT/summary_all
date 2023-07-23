
export function UsageDescription() {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="mx-auto mb-5 hidden max-w-fit rounded-full border-2 border-dashed px-4 py-1 text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:border-gray-700 md:block"
      href="https://www.bilibili.com/video/BV1fX4y1Q7Ux/"
    >
      Bilibili ビデオ URL のサフィックス「<span className="text-pink-400">.com</span>」を私のドメイン名に変更するだけです。
       <span className="text-sky-400">jimmylv.cn</span>" で十分です! 😉
       <br />
       たとえば、www.bilibili。
      <span className="text-pink-400 line-through">com</span>
      /video/BV1k84y1e7fW 👉 www.bilibili.
      <span className="text-sky-400 underline">jimmylv.cn</span>
      /video/BV1k84y1e7fW
    </a>
  )
}
