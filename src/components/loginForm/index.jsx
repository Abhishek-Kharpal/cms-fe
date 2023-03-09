import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { AUTH_URL, LOGIN_USER } from '../../constants/apiEndpoints';
import { ERROR_ROUTE, HOME_ROUTE } from '../../constants/routes';
import './style.css';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const token = await makeRequest(LOGIN_USER, { data: data }, navigate, AUTH_URL);
    if (token) {
      localStorage.setItem('token', token);
      navigate(HOME_ROUTE);
    } else {
      navigate(ERROR_ROUTE);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <p style={{ margin: '0px' }}>Email</p>
      <input
        {...register('email', {
          required: true,
          maxLength: 30,
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
        })}
        style={{ marginBottom: '10px', marginTop: '5px', height: '20px', width: '300px' }}
      />
      {errors?.email?.type === 'required' && <p className='error'>This field is required</p>}
      {errors?.email?.type === 'maxLength' && (
        <p className='error'>This field is exceeding 30 characters</p>
      )}
      {errors?.email?.type === 'pattern' && <p className='error'>Must be a valid email</p>}
      <p style={{ margin: '0px' }}>Password</p>
      <input
        type='password'
        {...register('password', {
          required: true,
          minLength: 8,
          maxLength: 99,
          pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        })}
        style={{ marginBottom: '10px', marginTop: '5px', height: '20px', width: '300px' }}
      />
      {errors?.password?.type === 'required' && <p className='error'>This field is required</p>}
      {errors?.password?.type === 'maxLength' && (
        <p className='error'>This field is exceeding 99 characters</p>
      )}
      {errors?.password?.type === 'minLength' && (
        <p className='error'>This field is less than 8 characters</p>
      )}
      {errors?.password?.type === 'pattern' && (
        <p>
          Password must be minimum eight characters, at least one letter, one number and one special
          character
        </p>
      )}
      <button type='submit'>Login</button>
      <p>
        Dont have an account? <Link to='/register'>Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
