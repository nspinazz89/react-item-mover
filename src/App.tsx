import { useState } from "react";
import Person  from './Person'
import './App.css'
import AddItemModal from './AddItemModal';
import { ItemType, PersonType } from "./types";

function App() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [modalVisible, setModalVisibility] = useState(false)
  const [people, setPeople] = useState<PersonType[]>([
    { name: 'Bill', items: [] as ItemType[] },
    { name: 'Bob', items: [] as ItemType[] },
    { name: 'Joe', items: [] as ItemType[] },
    { name: 'Jane', items: [] as ItemType[] },
  ]);

  const moveItemToNextPerson = (itemId: string, personName: string) => {
    const personIndex = people.findIndex(p => p.name === personName);
    if (personIndex !== -1 && personIndex < people.length - 1) {
      const nextPerson = people[personIndex + 1];
      const nextPersonItems = [...nextPerson.items];
      const personItems = [...people[personIndex].items];
      const itemIndex = personItems.findIndex(item => item.id === itemId);
      const itemToMove = personItems.splice(itemIndex, 1)[0];

      if (itemIndex <= nextPersonItems.length) {
        nextPersonItems.splice(itemIndex, 0, itemToMove);
      } else {
        nextPersonItems.push(itemToMove);
      }

      const updatedPeople = [...people];
      updatedPeople[personIndex].items = personItems;
      updatedPeople[personIndex + 1].items = nextPersonItems;
      setPeople(updatedPeople);
    }
  };

  const moveItemToPreviousPerson = (itemId: string, personName: string) => {
    const personIndex = people.findIndex(p => p.name === personName);
    if (personIndex > 0) {
      const previousPerson = people[personIndex - 1];
      const previousPersonItems = [...previousPerson.items];
      const personItems = [...people[personIndex].items];
      const itemIndex = personItems.findIndex(item => item.id === itemId);
      const itemToMove = personItems.splice(itemIndex, 1)[0];

      if (itemIndex <= previousPersonItems.length) {
        previousPersonItems.splice(itemIndex, 0, itemToMove);
      } else {
        previousPersonItems.push(itemToMove);
      }

      const updatedPeople = [...people];
      updatedPeople[personIndex].items = personItems;
      updatedPeople[personIndex - 1].items = previousPersonItems;
      setPeople(updatedPeople);
    }
  };

  const openModalForPerson = (person: string) => {
    setSelectedPerson(person);
    setModalVisibility(true);
  }

  const addItemToPerson = (item: string, personName: string) => {
    const updatedPeople = people.map((person) =>
      person.name === personName
        ? { ...person, items: [...person.items, { id: Date.now().toString(), value: item }] }
        : person
    );
    setPeople(updatedPeople);
  }
  return (
    <>
      {modalVisible &&
      <AddItemModal
        person={selectedPerson}
        modalVisible={modalVisible}
        addItemToPerson={addItemToPerson}
          setModalVisibility={setModalVisibility}
      />}

      <div className='container'>
        <div className='row'>
          {people.map((person, index) => (
            <div className='col-md-3' key={index}>
              <Person
                openModal={()=> openModalForPerson(person.name)}
                items={person.items}
                moveToNext={(itemId: string) => moveItemToNextPerson(itemId, person.name)}
                moveToPrevious={(itemId: string) => moveItemToPreviousPerson(itemId, person.name)}
              >
                {person.name}
              </Person>
          </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
