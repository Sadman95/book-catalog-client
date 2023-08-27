export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string | Date;
  featuredImage?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

export interface IAuth {
  toggleAuth: boolean;
  setToggleAuth: (toggleAuth: boolean) => void;
}

interface IMeta {
  page: number;
  limit: number;
  totalPages: number;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  meta?: IMeta | null;
}
