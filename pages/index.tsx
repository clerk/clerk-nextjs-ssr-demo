import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Clerk + NextJS SSR demo application</h1>
      You can find the documentation for the Clerk SSR Beta{' '}
      <a href='https://docs.clerk.dev/popular-guides/ssr-beta' target='_blank' rel='noreferrer'>
        here.
      </a>
      <h2>Demo pages:</h2>
      <ul>
        <li>
          <Link href='/ssr-enabled'>
            <a>Demo SSR page</a>
          </Link>
        </li>
        <li>
          <Link href='/ssr-preload'>
            <a>Demo SSR page with user and session preloading</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
