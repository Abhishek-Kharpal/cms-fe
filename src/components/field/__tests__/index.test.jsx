import {render,screen} from '@testing-library/react';
import Field from '../index';

describe('When Field is mounted', () => {
  it('renders correctly', () => {
    render(<Field fieldName='Field' fieldType='TEXT' handleDeleteField={()=>{}} fieldID={1} handleEditModal={()=>{}} />);
    expect(screen.getByText('Field')).toBeTruthy();
  });

  it('should call handleDeleteField when delete icon is clicked', () => {
    const handleDeleteField = jest.fn();
    render(<Field fieldName='Field' fieldType='TEXT' handleDeleteField={handleDeleteField} fieldID={1} handleEditModal={()=>{}} />);
    const deleteIcon = screen.getByAltText('delete-icon');
    deleteIcon.click();
    expect(handleDeleteField).toHaveBeenCalled();
  });

  it('should call handleEditModal when edit icon is clicked', () => {
    const handleEditModal = jest.fn();
    render(<Field fieldName='Field' fieldType='TEXT' handleDeleteField={()=>{}} fieldID={1} handleEditModal={handleEditModal} />);
    const editIcon = screen.getByAltText('edit-icon');
    editIcon.click();
    expect(handleEditModal).toHaveBeenCalled();
  });
});