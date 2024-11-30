# Species Table

This project is a React application that allows users to manage a collection of animals, including big cats, dogs, and big fish. The application provides functionalities to add, edit, and delete animals, as well as sort them based on various attributes.

## Table of Contents
- [Setup](#setup)
- [Running the App](#running-the-app)
- [How the App Works](#how-the-app-works)
    - [Animal Class Structure](#animal-class-structure)
    - [Animal JSON Data Structure](#animal-json-data-structure)
    - [Animal Table](#animal-table)
    - [Animal Form](#animal-form)

## Setup

1. **Clone the repository:**
     ```sh
     git clone https://github.com/SaiBarathR/species-table.git
     cd species-table
     ```

2. **Install dependencies:**
     ```sh
     npm install
     ```

3. **Set up the environment:**
     Ensure you have Node.js and npm installed. You can download Node.js from [here](https://nodejs.org/).

## Running the App

1. **Start the development server:**
     ```sh
     npm run dev
     ```

2. **Build the project for production:**
     ```sh
     npm run build
     ```

3. **Preview the production build:**
     ```sh
     npm run preview
     ```

## How the App Works

### Animal Class Structure

The `Animal` interface defines the structure of an animal object. Each animal has the following attributes:

```typescript
export interface Animal {
    id: string;         // Unique identifier for the animal
    species: string;    // Species of the animal
    name: string;       // Name of the animal
    size: number;       // Size of the animal, typically in a specific unit of measurement
    location: string;   // Location where the animal is found
    imageUrl: string;   // URL to an image of the animal
}
```

### Animal JSON Data Structure

The animal data is stored in arrays, each representing a category of animals. Here is an example of the `bigCats` array:

```typescript
export const bigCats: Animal[] = [
    {
        id: '1',
        species: 'Big Cats',
        name: 'Tiger',
        size: 10,
        location: 'Asia',
        imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=300'
    },
    {
        id: '2',
        species: 'Big Cats',
        name: 'Lion',
        size: 8,
        location: 'Africa',
        imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=300'
    },
];
```

### Animal Table

The `AnimalTable` component displays a table of animals. It supports sorting by different fields and provides buttons to edit or delete each animal.

```tsx
import React from 'react';
import { Animal } from '../types/Animal';

interface AnimalTableProps {
    animals: Animal[];
    onEdit: (animal: Animal) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

export const AnimalTable: React.FC<AnimalTableProps> = ({ animals, onEdit, onDelete, onAdd }) => {
    return (
        <div>
            <button onClick={onAdd}>Add New Animal</button>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Species</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map(animal => (
                        <tr key={animal.id}>
                            <td><img src={animal.imageUrl} alt={animal.name} width="100" /></td>
                            <td>{animal.species}</td>
                            <td>{animal.name}</td>
                            <td>{animal.size}</td>
                            <td>{animal.location}</td>
                            <td>
                                <button onClick={() => onEdit(animal)}>Edit</button>
                                <button onClick={() => onDelete(animal.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
```

### Animal Form

The `AnimalForm` component provides a form to add or edit an animal. It includes validation for the input fields.

```tsx
import React, { useState, useEffect } from 'react';
import { Animal } from '../types/Animal';

interface AnimalFormProps {
    animal?: Animal;
    onSubmit: (animal: Omit<Animal, 'id'>) => void;
    onCancel: () => void;
}

export const AnimalForm: React.FC<AnimalFormProps> = ({ animal, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        species: '',
        name: '',
        size: '',
        location: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (animal) {
            setFormData({
                species: animal.species,
                name: animal.name,
                size: String(animal.size),
                location: animal.location,
                imageUrl: animal.imageUrl,
            });
        }
    }, [animal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            species: formData.species,
            name: formData.name,
            size: Number(formData.size),
            location: formData.location,
            imageUrl: formData.imageUrl,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label>Size</label>
                <input
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                />
            </div>
            <div>
                <label>Location</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};
```

This README provides a comprehensive guide to setting up, running, and understanding the Species Table application. For more details, refer to the source code and comments within the project files.