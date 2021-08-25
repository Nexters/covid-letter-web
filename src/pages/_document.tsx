/* eslint-disable @next/next/no-css-tags */
import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class CustomDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                <Head>
                    <meta charSet="utf-8" />
                    <link
                        rel="preload"
                        href="/assets/fonts/Cafe24Ohsquare.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/Cafe24Ohsquareair.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/NanumBarunGothic.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/NanumBarunGothicLight.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/NanumBarunGothicBold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link rel="preload" href="/assets/styles/font.css" as="style" />
                    <link rel="stylesheet" type="text/css" href="/assets/styles/font.css" />
                    <link rel="preload" href="/assets/styles/index.css" as="style" />
                    <link rel="stylesheet" type="text/css" href="/assets/styles/index.css" />

                    <meta property="og:title" content="안녕, 나야" />
                    {/* <meta property="og:image" content="http://halo-its.me/assets/images/stickers/expect.png" /> */}
                    <meta id="metaOgUrl" property="og:url" content="http://halo-its.me" />
                    <meta property="og:description" content="안녕, 나야. 어쩌고저쩌고" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <div id="__portal"></div>
            </Html>
        )
    }
}
