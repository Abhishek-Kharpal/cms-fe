import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { BACKEND_URL, GET_ALL_COLLECTIONS, CREATE_COLLECTION,GET_ALL_FIELDS, DELETE_FIELD_BY_ID, CREATE_FIELD, EDIT_FIELD_BY_ID } from '../../constants/apiEndpoints';
import './style.css';
import Field from '../../components/field';

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editID, setEditID] = useState(null);
  const handleMount = async () => {
    await makeRequest(GET_ALL_COLLECTIONS,{},navigate,BACKEND_URL)
      .then((res) => {
        setCollections(res);
      });

    await makeRequest(GET_ALL_FIELDS,{},navigate,BACKEND_URL)
      .then((res) => {
        setFields(res);
      });
  };

  useEffect(() => {
    handleMount();
  },[]);

  const handleContentType = () => {
    setShowModal(true);
  };
  
  const handleCollection = (val) => {
    navigate(`/dashboard/${val}`);
  };

  const onEdit = async (data, event) => {
    event.preventDefault();
    const res = await makeRequest(EDIT_FIELD_BY_ID(editID),{
      data: {
        name: data.name,
        type: 'TEXT',
        collectionId: collections.filter((item) => item.name === selectedCollection)[0].id
      }
    },navigate,BACKEND_URL);
    if(res){
      const newFields = fields.map((item) => {
        if(item.id === res.id){
          return res;
        }
        return item;
      });
      setFields(newFields);
      const selectedCollectionsData = collections.filter((item) => item.name === selectedCollection);
      setSelectedFields(newFields.filter((item) => item.collectionId === selectedCollectionsData[0].id));
    }
    setEditableFields(editableFields.filter((item) => item.id !== editID));
    setShowEditModal(false);
    setEditID(null);
  };

  const handleDeleteField = async (id) => {
    await makeRequest(DELETE_FIELD_BY_ID(id),{},navigate,BACKEND_URL);
    const newFields = fields.filter((item) => item.id !== id);
    setFields(newFields);
    const selectedCollectionsData = collections.filter((item) => item.name === selectedCollection);
    setSelectedFields(newFields.filter((item) => item.collectionId === selectedCollectionsData[0].id));
  };
  
  const handleAddField = async () => {
    const response = await makeRequest(CREATE_FIELD,{
      data: {
        name: 'New Field',
        type: 'TEXT',
        collectionId: collections.filter((item) => item.name === selectedCollection)[0].id
      }
    },navigate,BACKEND_URL);

    setFields([...fields,response]);

    setSelectedFields([...selectedFields,response]);

    setEditableFields([...editableFields,response]);
  };

  const handleSelectedFields = (collectionName) => {
    const selectedCollectionsData = collections.filter((item) => item.name === collectionName);
    const selectedFieldsData = fields.filter((item) => item.collectionId === selectedCollectionsData[0].id);
    setSelectedFields(selectedFieldsData);
    setSelectedCollection(collectionName);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const res = await makeRequest(CREATE_COLLECTION,{
      data: data
    },navigate,BACKEND_URL);
    if(res){
      setCollections([...collections,res]);
    }
    setShowModal(false);
  };

  const handleEditModal = (id) => {
    const editable = editableFields.filter((item) => item.id === id);
    if(editable.length === 0){
      alert('Cant edit the field');
    }
    else{
      setShowEditModal(true);
      setEditID(id);
    }
  };

  return (collections)?(
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
              >
                {item.name}
              </li>
            ))}
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
              <p> {collections.length} types </p>
            </div>

            <button className='add-content-type' onClick={handleContentType}>
              + New Type
            </button>

            {
              collections.map((item) => (
                <button className='content-type' 
                        key={item.id} 
                        onClick={()=>handleSelectedFields(item.name)}
                        style={(selectedCollection===item.name)?{backgroundColor: 'rgb(79, 33, 198)',color: '#f5f5f5'}:{}} >
                  {item.name}
                </button>
              ))
            }
          </div>
          
          {
            (selectedCollection)?(
              <div className='selected-content basic-padding'>
                <div className='profile-title'>
                  <p>{selectedCollection}</p>
                  <p> {selectedFields.length} fields</p>
                </div>

                <button className='add-content-type' onClick={handleAddField}>Add another field</button>

                {
                  selectedFields.map((item) => (
                    <Field key={item.id} fieldName={item.name} fieldType={item.type} handleDeleteField={handleDeleteField} fieldID={item.id} handleEditModal={handleEditModal}/>
                  ))
                }
              </div>
            ):(
              <div className='selected-content basic-padding'>
                <p>Please Select a content type</p>
              </div>
            )
              
          }
          
        </div>
      </div>

      {showModal && (
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='content-form'>
            <p>Name of the content type</p>
            <input
              {...register('name', {
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

      {showModal && (
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)} className='content-form'>
            <p>Name of the content type</p>
            <input
              {...register('name', {
                required: true,
                maxLength: 200,
              })}
              type='text'
              className='input'
            />
            {errors?.name?.type === 'required' && (
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

      {
        showEditModal && (
          <div className='form-container'>
            <form onSubmit={handleSubmit(onEdit)} className='content-form'>
              <p>Edit name of the content</p>
              <input
                {...register('name', {
                  required: true,
                  maxLength: 200,
                })}
                type='text'
                className='input'
              />
              {errors?.name?.type === 'required' && (
                <p className='error'>This field is required</p>
              )}
              <div className='button-container'>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button className='submit-button' type='submit'>
                  Edit
                </button>
              </div>
            </form>
          </div>)
      }
      
    </div>
  ):(
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Home;
