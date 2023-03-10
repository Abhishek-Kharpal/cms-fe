import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { BACKEND_URL, GET_ALL_COLLECTIONS } from '../../constants/apiEndpoints';
import EntryField from '../../components/entryField';
import './style.css';

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const param = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const handleMount = async () => {
    await makeRequest(GET_ALL_COLLECTIONS,{},navigate,BACKEND_URL)
      .then((res) => {
        setCollections(res);
      });
  };

  useEffect(() => {
    handleMount();
  },[]);

  const id = param.name;

  const handleCollection = (val) => {
    navigate(`/dashboard/${val}`);
  };
  const onSubmit = (data, event) => {
    event.preventDefault();
    setShowModal(false);
  };

  return collections?(
    <div className='home-container'>
      <div className='sidebar'>
        <div className='title basic-padding'>
          <p>CMS+</p>
        </div>
        <div className='collection-holder basic-padding'>
          <p>COLLECTION TYPES</p>
          <ul>
            {collections.map((item) => (
              <li
                key={item.id}
                onClick={() => handleCollection(item.name)}
                style={{ backgroundColor: id === item.name && 'rgb(0,0,0)' }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div
          className='builder-holder basic-padding'
          style={{ backgroundColor: 'rgb(39, 39, 39)' }}
          onClick={()=>navigate('/dashboard')}
        >
          <p>CONTENT TYPE BUILDER</p>
        </div>
      </div>

      <div className='main-container'>
        <div className='title basic-padding'>
          <p>Content Types</p>
        </div>

        <div className='entry-holder'>
          <div className='entry-data basic-padding'>
            <p> 13 Entries found </p>
            <p className='add-entry' onClick={() => setShowModal(true)}>
              {' '}
              Add a new entry{' '}
            </p>
          </div>

          <div className='entry-headers basic-padding'>
            <div className='entry-top-header'>
              <p> ID </p>
              <p> Title </p>
              <p> Name </p>
              <p> Author</p>
            </div>
            <div>
              <p>Actions</p>
            </div>
          </div>

          <EntryField />
        </div>
      </div>
      {showModal && (
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
            <p>New Company_Profile</p>
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
  ):(
    <div>
      <p>Loading</p>
    </div>
  );
};

export default Home;
