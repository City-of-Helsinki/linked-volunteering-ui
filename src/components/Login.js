import userManager from '../utils/userManager';

const Login = () => {
  userManager.signinRedirect();

  return null;
};

export default Login;
