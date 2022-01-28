import type { NextPage } from 'next';
import { useUser, SignOutButton, SignInButton } from '@clerk/nextjs';

const CsrOnlyPage: NextPage = () => {
  const { isLoading, isSignedIn, user } = useUser();
  console.log('useUser(): ', { isLoading, isSignedIn, user });

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
    </div>
  );
};

export default CsrOnlyPage;
