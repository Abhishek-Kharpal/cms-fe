import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { REGISTER_USER } from '../../constants/apiEndpoints';
import './style.css';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data,event) => {
    event.preventDefault();
    const newUser = await makeRequest(REGISTER_USER,{data: data},navigate);
    if(newUser)
    {
      navigate('/login');
    }
    else
    {
      navigate('/error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <p style={{margin: '0px'}}>Email</p>
      <input
        {...register('email', {
          required: true,
          maxLength: 30,
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
        })}
        style={{marginBottom: '10px', marginTop: '5px',height: '20px', width: '300px'}}
      />
      {errors?.email?.type === 'required' && <p className='error'>This field is required</p>}
      {errors?.email?.type === 'maxLength' && <p className='error'>This field is exceeding 30 characters</p>}
      {errors?.email?.type === 'pattern' && <p className='error'>Must be a valid email</p>}
      <p style={{margin: '0px'}}>Password</p>
      <input
        type='password'
        {...register('password', {
          required: true,
          minLength: 8,
          maxLength: 99,
          pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        })}
        style={{marginBottom: '10px', marginTop: '5px',height: '20px', width: '300px'}}
      />
      {errors?.password?.type === 'required' && <p className='error'>This field is required</p>}
      {errors?.password?.type === 'maxLength' && <p className='error'>This field is exceeding 99 characters</p>}
      {errors?.password?.type === 'minLength' && <p className='error'>This field is less than 8 characters</p>}
      {errors?.password?.type === 'pattern' && (
        <p className='error'>
          Password must be minimum eight characters, at least one letter, one number and one special
          character
        </p>
      )}
      <button type='submit'>
        Register
      </button>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
