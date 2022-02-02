import type { InferGetServerSidePropsType } from 'next';
import { SignInButton, SignOutButton, useSession, useUser } from '@clerk/nextjs';
import { withServerSideAuth } from '@clerk/nextjs/ssr';

export const getServerSideProps = withServerSideAuth(
  async context => {
    const { sessionId, userId, getToken } = context.auth;
    const { user, session } = context;
    console.log('Available during SSR:', sessionId, userId, await getToken());
    console.log('Available during SSR:', user, session);
  },
  { loadUser: true, loadSession: true },
);

const SsrPreload = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <PreloadedUser />
      <PreloadedSession />
    </div>
  );
};

function PreloadedUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log('useUser(): ', { isLoaded, isSignedIn, user });

  return (
    <div>
      <h1>useUser state</h1>
      {user && <SignOutButton />}
      {!user && <SignInButton mode='modal' redirectUrl={'./'} />}
      <pre>
        isLoaded: {JSON.stringify(isLoaded)} <br />
        isSignedIn: {JSON.stringify(isSignedIn)} <br />
        user: {JSON.stringify(user)} <br />
      </pre>
    </div>
  );
}

function PreloadedSession() {
  const { isLoaded, isSignedIn, session } = useSession();
  console.log('useSession(): ', { isLoaded, isSignedIn, session });

  return (
    <div>
      <h1>useSession state</h1>
      <pre>
        isLoaded: {JSON.stringify(isLoaded)} <br />
        isSignedIn: {JSON.stringify(isSignedIn)} <br />
        session: {JSON.stringify(session)} <br />
      </pre>
    </div>
  );
}

export default SsrPreload;
