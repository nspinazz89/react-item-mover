
import { useState } from 'react';
import { Modal } from 'react-bootstrap'

interface AddItemModalProps {
  modalVisible: boolean;
  setModalVisibility: (visible: boolean) => void;
  person: string | null;
  addItemToPerson: (item: string, person: string) => void;
}


const AddItemModal = ({modalVisible, setModalVisibility, person, addItemToPerson}: AddItemModalProps) => {
  const [item, setItem] = useState('')
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addItemToPerson(item, person!);
    setModalVisibility(false);
  }

  return (
    <Modal show={modalVisible} onHide={() => setModalVisibility(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='item'>Item</label>
            <input type='text' className='form-control' id='item' onChange={e => setItem(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddItemModal
