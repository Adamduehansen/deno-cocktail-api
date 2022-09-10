import { PageProps, Handlers } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import Layout from '../components/Layout.tsx';

interface SearchResult {
  results: any[];
  query: string;
}

export const handler: Handlers<SearchResult> = {
  GET: async function (req, ctx) {
    const query = new URL(req.url).searchParams.get('query') || '';
    const serviceUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
    const result = await fetch(serviceUrl);
    const drinks = (await result.json()).drinks;

    return ctx.render({
      query: query,
      results:
        drinks === null
          ? []
          : drinks.map((drink: any) => {
              return {
                id: drink.idDrink,
                name: drink.strDrink,
              };
            }),
    });
  },
};

function Search({ data }: PageProps<SearchResult>) {
  const { query, results } = data;

  return (
    <Layout>
      <Head>
        <title>Search: {query}</title>
        <meta name='description' content='Coctail recepies' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h2 className='text-2xl'>Search Results</h2>
      {(results.length > 0 && (
        <ul>
          {results.map((result, index) => {
            return (
              <li key={`${index}_${result.id}`}>
                <a href={`/cocktails/${result.id}`} className='text-green-600'>
                  {result.name}
                </a>
              </li>
            );
          })}
        </ul>
      )) || <div>No results</div>}
    </Layout>
  );
}

export default Search;
