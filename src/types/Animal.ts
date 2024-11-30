/**
 * Represents an animal with various attributes.
 */
export interface Animal {
  /**
   * Unique identifier for the animal.
   */
  id: string;

  /**
   * Species of the animal.
   */
  species: string;

  /**
   * Name of the animal.
   */
  name: string;

  /**
   * Size of the animal, typically in a specific unit of measurement.
   */
  size: number;

  /**
   * Location where the animal is found.
   */
  location: string;

  /**
   * URL to an image of the animal.
   */
  imageUrl: string;
}

export type SortField = 'name' | 'size' | 'location' | 'species';