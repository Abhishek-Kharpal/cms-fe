import './style.css';

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

      </div>
    </div>
  );
};

export default Home;
