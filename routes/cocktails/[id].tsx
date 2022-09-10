import { PageProps, Handlers } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import IngredientsList from '../../islands/IngredientsList.tsx';
import Layout from '../../components/Layout.tsx';

interface PageData {
  drink: any;
}

export const handler: Handlers<PageData> = {
  GET: async function (_, ctx) {
    const { id } = ctx.params;
    const serviceUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(serviceUrl);
    const drinks = (await result.json()).drinks;
    const drink = drinks[0];
    return ctx.render({
      drink: drink,
    });
  },
};

export default function Page({ data }: PageProps<PageData>) {
  const { drink } = data;

  return (
    <Layout>
      <Head>
        <title>{drink.strDrink}</title>
        <meta name='description' content='Coctail recepies' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h2 className='text-2xl'>{drink.strDrink}</h2>
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        width='200'
        height='200'
      />
      <p>{drink.strInstructions}</p>
      <IngredientsList
        ingredients={Object.keys(drink)
          .filter((prop) => {
            return prop.indexOf('strIngredient') >= 0 && drink[prop] !== null;
          })
          .map((prop) => {
            const ingredientIndex = prop.slice(-1);
            return {
              text: drink[prop],
              measure: drink[`strMeasure${ingredientIndex}`],
            };
          })}
      />
    </Layout>
  );
}
