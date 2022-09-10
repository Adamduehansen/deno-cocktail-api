import { Head } from '$fresh/runtime.ts';
import Layout from '../components/Layout.tsx';

function Home() {
  return (
    <Layout>
      <div className='flex justify-center items-center h-full'>
        <Head>
          <title>Coctails Recepies</title>
          <meta name='description' content='Coctail recepies' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <form action='/search' className='flex flex-col'>
          <input
            type='text'
            autoFocus
            id='recipe-search'
            name='query'
            className='border border-yellow-400 rounded p-2'
          />
          <button type='submit'>Search</button>
        </form>
      </div>
    </Layout>
  );
}

export default Home;
