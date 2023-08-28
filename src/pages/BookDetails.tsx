import BookReview from '@/components/books/BookReview';
import { Button } from '@/components/ui/button';
import { useGetSingleBookQuery } from '@/redux/features/books/booksApi';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useGetSingleBookQuery(id);

  useEffect(() => {
    if (data?.data) {
      refetch();
    }
  }, [data?.data]);

  return (
    <>
      {error && <div>{(error as any).data.message}</div>}
      {isLoading && <div>Loading...</div>}
      <div className="flex items-center pb-6 mx-auto border-b border-gray-300 max-w-7xl pt-36">
        <div className="w-[50%]">
          <img src={data?.data?.featuredImage} alt="book_img" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">Title: {data?.data?.title}</h1>
          <p>Author: {data?.data?.author}</p>
          <p>Genre: {data?.data?.genre}</p>
          <p>
            Publication date:{' '}
            {new Date(data?.data?.publicationDate).toDateString()}
          </p>

          <Link to={`/edit-book/${id as string}`}>
            <Button className="btn btn-primary">Edit book</Button>
          </Link>
          <Button className="btn btn-danger ms-2">Delete book</Button>
        </div>
      </div>
      <BookReview bookId={id as string} />
    </>
  );
}
