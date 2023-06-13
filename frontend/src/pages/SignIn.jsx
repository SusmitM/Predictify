import { useAuth0 } from "@auth0/auth0-react";

export const SignIn = () => {
  const { loginWithRedirect } = useAuth0();

  loginWithRedirect();

  return <></>;
};
