export interface Animal {
  id: string;
  species: string;
  name: string;
  size: number;
  location: string;
  imageUrl: string;
}

export type SortField = 'name' | 'size' | 'location' | 'species';