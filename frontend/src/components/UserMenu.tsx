import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function UserMenu() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
