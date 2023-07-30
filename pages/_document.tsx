import Document, { Head, Html, Main, NextScript } from 'next/document'
import { BASE_DOMAIN } from '~/utils/constants'

class MyDocument extends Document {
  render() {
    let description = 'Youtubeビデオコンテンツのワンクリック要約（iOSショートカットコマンドをサポート）'
    let ogimage = `${BASE_DOMAIN}/og-image.png`
    let sitename = 'b.jimmylv_wait_to_change_not_set.cn'
    let title = 'ワンクリックで動画コンテンツをまとめられる'

    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐣</text></svg>"
          />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={sitename} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={ogimage} />
          <meta name="twitter:image" content={ogimage} />
        </Head>
        <body className="bg-white text-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
