import { ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
}

export default function Layout({ children }: Props) {
  return (
    <div className='w-screen h-screen flex flex-col p-4'>
      <header>
        <a href='/'>
          <h1 className='text-4xl'>The Cocktail DB</h1>
        </a>
      </header>
      <main className='flex-1'>{children}</main>
      <footer>
        <small>
          Supported by{' '}
          <a
            href='https://www.thecocktaildb.com/'
            target='_blank'
            rel='noreferrer'
          >
            https://www.thecocktaildb.com/
          </a>
        </small>
      </footer>
    </div>
  );
}
