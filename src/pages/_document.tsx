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
                        href="/assets/styles/index.css"
                        as="style"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/assets/styles/index.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
