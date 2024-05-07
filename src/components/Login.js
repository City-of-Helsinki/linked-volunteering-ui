import userManager from '../utils/userManager';

function Login() {
  userManager.signinRedirect();

  return null;
}

export default Login;
