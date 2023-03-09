import entryImage from '../../assets/entry-image/entry-image.png';
import RegisterForm from '../../components/registerForm';
import './style.css';

const Register = () => {
  return (
    <div className='login-page'>
      <div className='entry-image'>
        <img src={entryImage} alt='entry-image' />
      </div>
      <div className='login-form-container'>
        <div className='form-header'>
          <div>Register your CMS+ account</div>
        </div>
        <div className='form-container'>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
