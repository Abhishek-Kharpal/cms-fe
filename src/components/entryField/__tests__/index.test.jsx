import { render,screen } from '@testing-library/react';
import EntryField from '../index';

describe('When EntryField is mounted', () => {
  it('renders correctly', () => {
    render (
      <EntryField entry={{
        name: 'TEST'
      }}
      selectedFields={[{
        name: 'name',
        id: 1
      }]}
      />
    );
    expect(screen.getByText('TEST')).toBeTruthy();
  });

  it('should call handleDelete when delete icon is clicked', () => {
    const handleDelete = jest.fn();
    render (
      <EntryField entry={{
        name: 'TEST'
      }}
      selectedFields={[{
        name: 'name',
        id: 1
      }]}
      handleDelete={handleDelete}
      />
    );
    const deleteIcon = screen.getByAltText('delete');
    deleteIcon.click();
    expect(handleDelete).toHaveBeenCalled();
  });
});