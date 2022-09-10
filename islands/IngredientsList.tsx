import { useState } from 'preact/hooks';

interface Ingredient {
  text: string;
  measure: string;
}

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientsList({ ingredients }: Props) {
  const [amount, setAmount] = useState(1);

  return (
    <div>
      <div className='inline-block border-2 border-blue-600  bg-blue-400 text-white rounded-lg'>
        <button
          className='px-4 py-2 border-r border-blue-600'
          onClick={() => setAmount((current) => current + 1)}
        >
          +
        </button>
        <button
          className='px-4 py-2 border-l border-blue-600'
          onClick={() => setAmount((current) => current - 1)}
        >
          -
        </button>
      </div>
      <ul>
        {ingredients.map((ingredient, index) => {
          return (
            <li key={index}>
              {amount} x {ingredient.text} ({ingredient.measure})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
