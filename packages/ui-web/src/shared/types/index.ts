export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
