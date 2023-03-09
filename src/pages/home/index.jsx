import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Field from '../../components/field';

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  const handleContentType = () => {
    setShowModal(true);
  };
  const navigate = useNavigate();
  const handleCollection = (val) => {
    navigate(`/dashboard/${val}`);
  };
  const onSubmit = (data, event) => {
    event.preventDefault();
    setShowModal(false);
  };

  return (
    <div className='home-container'>
      <div className='sidebar'>
        <div className='title basic-padding'>
          <p>CMS+</p>
        </div>
        <div className='collection-holder basic-padding'>
          <p>COLLECTION TYPES</p>
          <ul>
            <li onClick={() => handleCollection('VAL')}>Collection 1</li>
            <li>Collection 2</li>
            <li>Collection 3</li>
            <li>Collection 4</li>
            <li>Collection 5</li>
            {/* if contains more make +n val */}
          </ul>
        </div>
        <div className='builder-holder basic-padding'>
          <p>CONTENT TYPE BUILDER</p>
        </div>
      </div>

      <div className='main-container'>
        <div className='title basic-padding'>
          <p>Content Types</p>
        </div>

        <div className='content-holder'>
          <div className='content-type-holder basic-padding'>
            <div className='meta-data'>
              <p> 7 types </p>
            </div>

            <button className='add-content-type' onClick={handleContentType}>
              + New Type
            </button>

            <button className='content-type'>Company Profile 13</button>
          </div>

          <div className='selected-content basic-padding'>
            <div className='profile-title'>
              <p>Company_Profile</p>
              <p> 13 fields</p>
            </div>

            <button className='add-content-type'>Add another field</button>

            <Field />
          </div>
        </div>
      </div>

      {showModal && (
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='content-form'>
            <p>Name of the content type</p>
            <input
              {...register('content', {
                required: true,
                maxLength: 200,
              })}
              type='text'
              className='input'
            />
            {errors?.content?.type === 'required' && (
              <p className='error'>This field is required</p>
            )}
            <div className='button-container'>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className='submit-button' type='submit'>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
