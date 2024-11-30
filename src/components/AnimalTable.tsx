import React, { useState } from 'react';
import { Animal, SortField } from '../types/Animal';
import { Edit, Trash2 } from 'lucide-react';

interface AnimalTableProps {
  animals: Animal[];
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  sortableFields: SortField[];
  nameStyle?: 'normal' | 'bold' | 'bold-italic-blue';
}

export const AnimalTable: React.FC<AnimalTableProps> = ({
  animals,
  onEdit,
  onDelete,
  onAdd,
  sortableFields,
  nameStyle = 'normal'
}) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: SortField) => {
    if (!sortableFields.includes(field)) return;
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAnimals = [...animals].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc'
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  const getNameClassName = () => {
    switch (nameStyle) {
      case 'bold':
        return 'fw-bold';
      case 'bold-italic-blue':
        return 'fw-bold fst-italic text-primary';
      default:
        return '';
    }
  };

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={onAdd}>
          Add New Animal
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th
              onClick={() => handleSort('species')}
              className={sortableFields.includes('species') ? 'cursor-pointer' : ''}
            >
              Species {sortField === 'species' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('name')}
              className={sortableFields.includes('name') ? 'cursor-pointer' : ''}
            >
              Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('size')}
              className={sortableFields.includes('size') ? 'cursor-pointer' : ''}
            >
              Size (ft) {sortField === 'size' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('location')}
              className={sortableFields.includes('location') ? 'cursor-pointer' : ''}
            >
              Location {sortField === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAnimals.map((animal) => (
            <tr key={animal.id}>
              <td>
                <div className="animal-image-container">
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    className="animal-image"
                    width="100"
                  />
                  <div className="animal-image-overlay">
                    <span>{animal.name}</span>
                  </div>
                </div>
              </td>
              <td>{animal.species}</td>
              <td className={getNameClassName()}>{animal.name}</td>
              <td>{animal.size}</td>
              <td>{animal.location}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEdit(animal)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(animal.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};