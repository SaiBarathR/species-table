// Import necessary modules and types from React and local files
import React, { useState, useEffect } from 'react';
import { Animal } from '../types/Animal';

// Define the props for the AnimalForm component
interface AnimalFormProps {
  animal?: Animal;
  onSubmit: (animal: Omit<Animal, 'id'>) => void;
  onCancel: () => void;
  existingAnimals: Animal[];
  species: 'Big Cats' | 'Dog' | 'Big Fish';
}

// Define the AnimalForm component
export const AnimalForm: React.FC<AnimalFormProps> = ({
  animal,
  onSubmit,
  onCancel,
  existingAnimals,
  species,
}) => {
  // Initialize state for form data and errors
  const [formData, setFormData] = useState({
    species: species,
    name: '',
    size: '',
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=300',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form data if an animal is being edited
  useEffect(() => {
    if (animal) {
      setFormData((prev) => ({
        ...prev,
        name: animal.name,
        size: String(animal.size),
        location: animal.location,
        imageUrl: animal.imageUrl,
      }));
    }
  }, [animal]);

  // Validate the form data
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (
      existingAnimals.some(
        (a) => a.name.toLowerCase() === formData.name.toLowerCase() && a.id !== animal?.id
      )
    ) {
      newErrors.name = 'This animal name already exists';
    }

    // Validate size
    if (!formData.size.trim()) {
      newErrors.size = 'Size is required';
    } else if (isNaN(Number(formData.size)) || Number(formData.size) <= 0) {
      newErrors.size = 'Size must be a positive number';
    }

    // Validate location
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Validate image URL
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!formData.imageUrl.startsWith('https://')) {
      newErrors.imageUrl = 'Image URL must be HTTPS';
    }

    // Set errors and return validation status
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        species: formData.species,
        name: formData.name,
        size: Number(formData.size),
        location: formData.location,
        imageUrl: formData.imageUrl,
      });
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mt-4">
      {/* Name input field */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      {/* Size input field */}
      <div className="mb-3">
        <label className="form-label">Size (ft)</label>
        <input
          type="number"
          className={`form-control ${errors.size ? 'is-invalid' : ''}`}
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
        {errors.size && <div className="invalid-feedback">{errors.size}</div>}
      </div>

      {/* Location input field */}
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className={`form-control ${errors.location ? 'is-invalid' : ''}`}
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        {errors.location && <div className="invalid-feedback">{errors.location}</div>}
      </div>

      {/* Image URL input field */}
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
        {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
      </div>

      {/* Submit and Cancel buttons */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {animal ? 'Update' : 'Add'} Animal
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};