import './style.css';
import Field from '../../components/field';


const Home = () => {
  return (
    <div className='home-container'>
      <div className='sidebar'>
        <div className='title basic-padding'>
          <p>CMS+</p>
        </div>
        <div className='collection-holder basic-padding'>
          <p>COLLECTION TYPES</p>
          <ul>
            <li>Collection 1</li>
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

            <button className='add-content-type'>
              + New Type
            </button>

            <button className='content-type'>
              Company Profile 13
            </button>
          </div>

          <div className='selected-content basic-padding'>
            <div className='profile-title'>
              <p>Company_Profile</p>
              <p> 13 fields</p>
            </div>

            <button className='add-content-type'>
              Add another field
            </button>

            <Field/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
