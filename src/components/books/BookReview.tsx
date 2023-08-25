interface IProps {
  bookId: string;
}

const BookReview = ({ bookId }: IProps) => {
  return <div>reviews {bookId}</div>;
};

export default BookReview;
