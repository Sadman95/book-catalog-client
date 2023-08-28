import { Link } from 'react-router-dom';
import { IBook } from '@/types/globalTypes';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <Link to={`/books/${book._id}`} className="w-full">
      <div className="rounded-2xl flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <img
          className="w-full border rounded-xl"
          src={book?.featuredImage}
          alt="book_img"
        />
        <h1 className="text-xl font-semibold">{book?.title}</h1>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
        <p>
          Publication date: {new Date(book?.publicationDate).toDateString()}
        </p>
      </div>
    </Link>
  );
}
