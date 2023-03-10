import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import {
  BACKEND_URL,
  GET_ALL_COLLECTIONS,
  GET_ALL_FIELDS,
  GET_ALL_ENTRIES,
  CREATE_ENTRY,
  DELETE_ENTRY_BY_ID,
} from '../../constants/apiEndpoints';
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
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const handleMount = async () => {
    const collectionsData = await makeRequest(GET_ALL_COLLECTIONS, {}, navigate, BACKEND_URL);

    const fieldsData = await makeRequest(GET_ALL_FIELDS, {}, navigate, BACKEND_URL);

    const entriesData = await makeRequest(GET_ALL_ENTRIES, {}, navigate, BACKEND_URL);

    setCollections(collectionsData);
    const collectionID = collectionsData.filter((item) => item.name === param.name)[0].id;
    const selectedFieldsData = fieldsData.filter((item) => item.collectionId === collectionID);
    setSelectedFields(selectedFieldsData);
    const selectedEntriesData = entriesData.filter((item) => item.collectionId === collectionID);
    setSelectedEntries(selectedEntriesData);
  };

  useEffect(() => {
    handleMount();
  }, [param]);

  const id = param.name;

  const handleCollection = (val) => {
    navigate(`/dashboard/${val}`);
  };
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const entryData = {
      collectionId: collections.filter((item) => item.name === id)[0].id,
      entryValues: data,
    };
    const response = await makeRequest(CREATE_ENTRY, { data: entryData }, navigate, BACKEND_URL);
    setSelectedEntries([...selectedEntries, response]);
    setShowModal(false);
  };

  const handleEntryDelete = async (id) => {
    await makeRequest(DELETE_ENTRY_BY_ID(id), {}, navigate, BACKEND_URL);
    const newEntries = selectedEntries.filter((item) => item.id !== id);
    setSelectedEntries(newEntries);
  };
  return collections ? (
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
          onClick={() => navigate('/dashboard')}
        >
          <p>CONTENT TYPE BUILDER</p>
        </div>
      </div>

      <div className='main-container'>
        <div className='title basic-padding'>
          <p>{id}</p>
        </div>

        <div className='entry-holder'>
          <div className='entry-data basic-padding'>
            <p> {selectedEntries.length} Entries found </p>
            <p className='add-entry' onClick={() => setShowModal(true)}>
              {' '}
              Add a new entry{' '}
            </p>
          </div>

          <div className='entry-headers basic-padding'>
            <div className='entry-top-header'>
              {selectedFields.map((item, index) => index < 4 && <p key={item.id}>{item.name}</p>)}
            </div>
            <div>
              <p>Actions</p>
            </div>
          </div>
          {selectedEntries.map((item) => (
            <EntryField key={item.id} entry={item.entryValues} id={item.id} selectedFields={selectedFields} handleDelete={handleEntryDelete} />
          ))}
        </div>
      </div>
      {showModal && (
        <div className='form-container' style={{ fontSize: '25px' }}>
          <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
            <p>New {id}</p>
            {selectedFields.map((item) => (
              <div key={item.id}>
                <p style={{ marginBottom: '5px' }}>{item.name}</p>
                <input
                  {...register(item.name, {
                    required: true,
                  })}
                />
                {errors[item.name] && (
                  <p className='error' style={{ fontSize: '20px' }}>
                    This field is required
                  </p>
                )}
              </div>
            ))}

            <div className='button-container-1'>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', color: 'rgb(79,79,79' }}
              >
                Cancel
              </button>
              <button className='submit-button' type='submit'>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  ) : (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default Home;
