import entryImage from '../../assets/entry-image/entry-image.png';
import LoginForm from '../../components/loginForm';
import './style.css';

const Login = () => {
  return (
    <div className='login-page'>
      <div className='entry-image'>
        <img src={entryImage} alt='entry-image' />
      </div>
      <div className='login-form-container'>
        <div className='form-header'>
          <div>Login to your CMS+ account</div>
        </div>
        <div className='form-container-1'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
