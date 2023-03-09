import './style.css';
import editIcon from '../../assets/edit-icon/edit-icon.png';
import deleteIcon from '../../assets/delete-icon/delete-icon.png';

const Field = () => {
  return (
    <div className='field'>
      <div className='field-title'>
        <p>Ab</p>
      </div>

      <div className='field-name'>
        <p>Name</p>
      </div>

      <div className='field-type'>
        <p>Text</p>
      </div>

      <div className='icon'>
        <img src={editIcon} alt='edit-icon'/>
      </div>

      <div className='icon'>
        <img src={deleteIcon} alt='delete-icon'/>
      </div>
    </div>
  );
};

export default Field;