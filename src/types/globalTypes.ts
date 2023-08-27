export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  featuredImage: string;
}

export interface IAuth {
  toggleAuth: boolean;
  setToggleAuth: (toggleAuth: boolean) => void;
}
