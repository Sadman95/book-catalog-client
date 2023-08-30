export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
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

export interface IUser {
  firstName: string;
  lastName: string;
  username?: string;
  avatar?: string;
  id?: string | null;
  email?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  role?: string;
  _id?: string;
}

/* 
createdAt
: 
"2023-08-26T12:00:03.599Z"
email
: 
"test@gmail.com"
firstName
: 
"Test"
lastName
: 
"User"
role
: 
"user"
updatedAt
: 
"2023-08-26T12:00:03.599Z"
__v
: 
0
_id
: 
"64e9e943f17c2558e7ea8178"
*/

export interface IReview {
  _id: string;
  comment: string;
  user: IUser;
}
