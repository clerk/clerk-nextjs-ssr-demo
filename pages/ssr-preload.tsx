import type { InferGetServerSidePropsType, NextPage } from 'next';
import { useUser, SignOutButton, SignInButton, useSession } from '@clerk/nextjs';
import { withServerSideAuth } from '@clerk/nextjs/ssr';

export const getServerSideProps = withServerSideAuth(
  async context => {
    const { sessionId, userId, getToken } = context.auth;
    const { user, session } = context;
    console.log('Available during SSR', sessionId, userId, await getToken());
    console.log('Available during SSR', user, session);
  },
  { loadUser: true, loadSession: true },
);

const SsrPreload = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLoading, isSignedIn, user } = useUser();
  const { session } = useSession();

  console.log('useUser(): ', { isLoading, isSignedIn, user });
  console.log('useSession(): ', { isLoading, isSignedIn, session });

  return (
    <div>
      {user && <SignOutButton />}
      {!user && <SignInButton mode='modal' redirectUrl={'./'} />}
      <h1>useUser state</h1>
      <pre>
        isLoading: {JSON.stringify(isLoading)} <br />
        isSignedIn: {JSON.stringify(isSignedIn)} <br />
        user: {JSON.stringify(user)} <br />
      </pre>
      <hr />
      <h1>useSession state</h1>
      <pre>
        isLoading: {JSON.stringify(isLoading)} <br />
        isSignedIn: {JSON.stringify(isSignedIn)} <br />
        session: {JSON.stringify(session)} <br />
      </pre>
    </div>
  );
};

export default SsrPreload;
