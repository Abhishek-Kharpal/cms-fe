import PropTypes from 'prop-types';
import editIcon from '../../assets/edit-icon/edit-icon.png';
import deleteIcon from '../../assets/delete-icon/delete-icon.png';
import './style.css';

const EntryField = ({entry,selectedFields}) => {
  return (
    <div
      className='entry-headers basic-padding'
      style={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }}
    >
      <div className='entry-top-header'>
        {
          selectedFields.map((item,index)=>index<4&&<p key={item.id}>{entry[item.name]}</p>)
        }
      </div>
      <div>
        <img src={editIcon} alt='edit' height={'20px'} style={{marginRight:'5px',marginTop: '15px'}}/>
        <img src={deleteIcon} alt='delete' height={'20px'}/>
      </div>
    </div>
  );
};

export default EntryField;

EntryField.propTypes = {
  entry: PropTypes.object,
  selectedFields: PropTypes.array,
};