import './style.css';
import editIcon from '../../assets/edit-icon/edit-icon.png';
import deleteIcon from '../../assets/delete-icon/delete-icon.png';
import PropTypes from 'prop-types';

const Field = ({fieldName,fieldType}) => {
  return (
    <div className='field'>
      <div className='field-title'>
        <p>Ab</p>
      </div>

      <div className='field-name'>
        <p>{fieldName}</p>
      </div>

      <div className='field-type'>
        <p>{fieldType}</p>
      </div>

      <div className='icon'>
        <img src={editIcon} alt='edit-icon' />
      </div>

      <div className='icon'>
        <img src={deleteIcon} alt='delete-icon' />
      </div>
    </div>
  );
};

Field.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
};

export default Field;
