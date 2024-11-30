import React, { useState, useEffect } from 'react';
import { Animal } from '../types/Animal';

interface AnimalFormProps {
  animal?: Animal;
  onSubmit: (animal: Omit<Animal, 'id'>) => void;
  onCancel: () => void;
  existingAnimals: Animal[];
}

export const AnimalForm: React.FC<AnimalFormProps> = ({
  animal,
  onSubmit,
  onCancel,
  existingAnimals,
}) => {
  const [formData, setFormData] = useState({
    species: '',
    name: '',
    size: '',
    location: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (animal) {
      setFormData({
        species: animal.species,
        name: animal.name,
        size: animal.size.toString(),
        location: animal.location,
        imageUrl: animal.imageUrl,
      });
    }
  }, [animal]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (
      existingAnimals.some(
        (a) => a.name.toLowerCase() === formData.name.toLowerCase() && a.id !== animal?.id
      )
    ) {
      newErrors.name = 'This animal name already exists';
    }

    if (!formData.size.trim()) {
      newErrors.size = 'Size is required';
    } else if (isNaN(Number(formData.size)) || Number(formData.size) <= 0) {
      newErrors.size = 'Size must be a positive number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!formData.imageUrl.startsWith('https://')) {
      newErrors.imageUrl = 'Image URL must be HTTPS';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Species</label>
        <input
          type="text"
          className={`form-control ${errors.species ? 'is-invalid' : ''}`}
          value={formData.species}
          onChange={(e) => setFormData({ ...formData, species: e.target.value })}
        />
        {errors.species && <div className="invalid-feedback">{errors.species}</div>}
      </div>

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