import type { InferGetServerSidePropsType } from 'next';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { withServerSideAuth } from '@clerk/nextjs/ssr';

export const getServerSideProps = withServerSideAuth(async context => {
  const { sessionId, userId, getToken } = context.auth;
  console.log('Available during SSR:', sessionId, userId, await getToken());
  return {
    props: {
      message: 'You can return any custom props as usual, and of course, everything is properly typed',
    },
  };
});

const SsrEnabled = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log('useUser(): ', { isLoaded, isSignedIn, user });

  return (
    <div>
      {user && <SignOutButton />}
      {!user && <SignInButton mode='modal' redirectUrl={'./'} />}
      <h1>useUser state</h1>
      <pre>
        isLoaded: {JSON.stringify(isLoaded)} <br />
        isSignedIn: {JSON.stringify(isSignedIn)} <br />
        user: {JSON.stringify(user)} <br />
      </pre>
      <hr />
      <p>Clerk integrates with NextJs SSR seamlessly: </p>
      <pre>
        props.message
        <br />
        {'> '}
        {props.message}
      </pre>
    </div>
  );
};

export default SsrEnabled;
