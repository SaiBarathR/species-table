import React, { useState } from 'react';
import { AnimalTable } from './components/AnimalTable';
import { AnimalForm } from './components/AnimalForm';
import { Animal } from './types/Animal';
import { bigCats, dogs, bigFish } from './data/animals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [animals, setAnimals] = useState({
    bigCats: bigCats,
    dogs: dogs,
    bigFish: bigFish,
  });
  const [editingAnimal, setEditingAnimal] = useState<{ animal: Animal; type: string } | null>(null);
  const [addingAnimalType, setAddingAnimalType] = useState<string | null>(null);

  const handleEdit = (animal: Animal, type: string) => {
    setEditingAnimal({ animal, type });
  };

  const handleDelete = (id: string, type: keyof typeof animals) => {
    if (confirm('Are you sure you want to delete this animal?')) {
      setAnimals({
        ...animals,
        [type]: animals[type].filter((animal) => animal.id !== id),
      });
    }
  };

  const handleAdd = (type: string) => {
    setAddingAnimalType(type);
  };

  const handleSubmit = (animalData: Omit<Animal, 'id'>, type: keyof typeof animals) => {
    if (editingAnimal) {
      setAnimals({
        ...animals,
        [type]: animals[type].map((animal) =>
          animal.id === editingAnimal.animal.id
            ? { ...animalData, id: animal.id }
            : animal
        ),
      });
      setEditingAnimal(null);
    } else {
      const newAnimal = {
        ...animalData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setAnimals({
        ...animals,
        [type]: [...animals[type], newAnimal],
      });
      setAddingAnimalType(null);
    }
  };
  console.log("addingAnimalType", addingAnimalType, "editingAnimal", editingAnimal)
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Animal Tables</h1>
      
      <div className="mb-5">
        <h2>Big Cats</h2>
        {(addingAnimalType === 'bigCats' || editingAnimal?.type === 'bigCats') && (
          <AnimalForm
            animal={editingAnimal?.animal}
            onSubmit={(data) => handleSubmit(data, 'bigCats')}
            onCancel={() => {
              setAddingAnimalType(null);
              setEditingAnimal(null);
            }}
            existingAnimals={animals.bigCats}
          />
        )}
        <AnimalTable
          animals={animals.bigCats}
          onEdit={(animal) => handleEdit(animal, 'bigCats')}
          onDelete={(id) => handleDelete(id, 'bigCats')}
          onAdd={() => handleAdd('bigCats')}
          sortableFields={['name', 'size', 'location','species']}
        />
      </div>

      <div className="mb-5">
        <h2>Dogs</h2>
        {addingAnimalType === 'dogs' || (editingAnimal?.type === 'dogs' && (
          <AnimalForm
            animal={editingAnimal?.animal}
            onSubmit={(data) => handleSubmit(data, 'dogs')}
            onCancel={() => {
              setAddingAnimalType(null);
              setEditingAnimal(null);
            }}
            existingAnimals={animals.dogs}
          />
        ))}
        <AnimalTable
          animals={animals.dogs}
          onEdit={(animal) => handleEdit(animal, 'dogs')}
          onDelete={(id) => handleDelete(id, 'dogs')}
          onAdd={() => handleAdd('dogs')}
          sortableFields={['name', 'location']}
          nameStyle="bold"
        />
      </div>

      <div className="mb-5">
        <h2>Big Fish</h2>
        {addingAnimalType === 'bigFish' || (editingAnimal?.type === 'bigFish' && (
          <AnimalForm
            animal={editingAnimal?.animal}
            onSubmit={(data) => handleSubmit(data, 'bigFish')}
            onCancel={() => {
              setAddingAnimalType(null);
              setEditingAnimal(null);
            }}
            existingAnimals={animals.bigFish}
          />
        ))}
        <AnimalTable
          animals={animals.bigFish}
          onEdit={(animal) => handleEdit(animal, 'bigFish')}
          onDelete={(id) => handleDelete(id, 'bigFish')}
          onAdd={() => handleAdd('bigFish')}
          sortableFields={['size', ]}
          nameStyle="bold-italic-blue"
        />
      </div>
    </div>
  );
}

export default App;