import BookReview from '@/components/books/BookReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useGetSingleBookQuery } from '@/redux/features/books/booksApi';
import { useAppDispatch } from '@/redux/hook';
import { Link, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetSingleBookQuery(id);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.title}</h1>
          <p>Author: {data?.author}</p>
          <p>Genre: {data?.genre}</p>
          <p>Publication date: {data?.publicationDate}</p>

          <Link to="/edit-book">
            <Button className="btn-primary">Edit book</Button>
          </Link>
          <Button className="btn-danger">Delete book</Button>
        </div>
      </div>
      <BookReview bookId={id as string} />
    </>
  );
}
