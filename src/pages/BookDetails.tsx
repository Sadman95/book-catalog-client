import BookReview from '@/components/books/BookReview';
import CoreAlertDialog from '@/components/core/_alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/books/booksApi';
import { useAppSelector } from '@/redux/hook';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.userInfo);

  const { data, isLoading, error, refetch } = useGetSingleBookQuery(id);
  const [
    deleteBook,
    {
      isLoading: deleteBookLoading,
      error: deleteBookError,
      data: deleteResponse,
      isSuccess,
      isError,
    },
  ] = useDeleteBookMutation();

  useEffect(() => {
    if (data?.data) {
      refetch();
    }
  }, [data?.data]);

  const deleteBookHandler = () => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to delete a book',
        duration: 3000,
        variant: 'destructive',
      });
      return;
    }

    deleteBook(id as string);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: deleteResponse?.message,
        duration: 3000,
        variant: 'default',
      });
      navigate(`/books`);
    }
    if (isError) {
      toast({
        title: 'Error',
        description: (deleteBookError as any).data?.message,
        duration: 3000,
        variant: 'destructive',
      });
    }
  }, [deleteBookError, isSuccess]);

  return (
    <>
      {error && <div>{(error as any).data?.message}</div>}
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
          <CoreAlertDialog
            dialogAction={deleteBookHandler}
            dialogTitle="Are you confirm to delete?"
            triggerContent={
              <Button
                disabled={deleteBookLoading}
                className="hover:bg-red-400 btn-danger ms-2"
              >
                {deleteBookLoading ? 'Deleting...' : 'Delete book'}
              </Button>
            }
          />
        </div>
      </div>
      <BookReview bookId={id as string} reviews={data?.data?.reviews} />
    </>
  );
}
