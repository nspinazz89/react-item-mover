import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { ItemType } from "./types";
interface PersonProps {
  children: ReactNode;
  items: ItemType[];
  openModal: () => void;
  moveToNext: (itemIndex: string) => void;
  moveToPrevious: (itemIndex: string) => void;
}

const Person = ({children, items, openModal, moveToNext, moveToPrevious}: PersonProps) => {
  return (
    <>
      <Card className="d-flex flex-column" style={{ padding: "0px", marginRight: '20px' }}>
        <Card.Body className='flex-grow-1'>
          <Card.Title>{children}</Card.Title>
          <div className='card-subtitle mb-2 text-muted' >Items</div>
          <div style={{padding: '20px'}}>
            {items.map((item, index) => (
              <div className='d-flex align-items-center' key={index}>
                <button className='btn btn-sm' onClick={() => moveToPrevious(item.id)}>←</button>
                <li className='list-group-item flex-grow-1'><Card.Text>{item.value}</Card.Text></li>
                <button className='btn btn-sm' onClick={() => moveToNext(item.id)}>→</button>
              </div>
            ))}
          </div>
        </Card.Body>
        <Card.Footer className='mt-auto'>
          <button className='btn btn-primary btn-block' onClick={openModal}>Add Item</button>
        </Card.Footer>
      </Card>
    </>
  )
}

export default Person
