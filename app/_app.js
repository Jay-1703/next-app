import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps , session }) {
  return (
    <>
      <Head>
        <title>CRUD</title>
        <meta name='description' content='Awesome webapp for everyone' />
      </Head>
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp;