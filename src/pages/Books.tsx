import BookCard from '@/components/books/BookCard';
import { Input } from '@/components/ui/input';
import { useGetBooksQuery } from '@/redux/features/books/booksApi';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import CoreSelect from '@/components/core/_select';
import CoreAlert from '@/components/core/_alert';
import generateRangeArray from '@/utils/generateRangeArray';

interface IQueryFilters {
  searchTerm: string;
  genre: string;
  publicationYear: string;
}

const initialQueryFilters = {
  searchTerm: '',
  genre: '',
  publicationYear: '',
};

export default function Products() {
  const [filters, setFilters] = useState<IQueryFilters>(initialQueryFilters);
  const [initialGenres, setInitialGenres] = useState([]);
  const [initialYears, setInitialYears] = useState([]);
  const [genres, setGenres] = useState(null);
  const [years, setYears] = useState(null);
  const { data, isLoading, error } =
    useGetBooksQuery<Record<string, any>>(filters);

  useEffect(() => {
    if (data?.data) {
      if (initialGenres.length === 0) {
        const genres = data.data.map((book: IBook) => book.genre);
        setGenres(genres);
        setInitialGenres(genres);
      }
      if (initialYears.length === 0) {
        const years = data.data.map((book: IBook) =>
          new Date(book.publicationDate).getFullYear()
        );
        setYears(years);
        setInitialYears(years);
      }
    }
  }, [data]);

  return (
    <div className="relative grid grid-cols-12 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 col-span-12 gap-4 pt-20 pb-20 align-top md:h-screen md:col-span-3">
        <div className="flex-col w-full h-full max-w-sm space-x-2 border-gray-200 border-hidden md:border-solid md:border-r-2">
          <Input
            type="text"
            placeholder="Search...e.g: The Great Gatsby"
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            value={filters.searchTerm}
            className="mb-2"
          />

          <CoreSelect
            data={[...new Set(genres)]!}
            onValueChange={(v) => setFilters({ ...filters, genre: v })}
            placeHolder="Genre"
          />
          <CoreSelect
            data={generateRangeArray(years!)}
            onValueChange={(v) =>
              setFilters({ ...filters, publicationYear: v })
            }
            placeHolder="Year"
          />
        </div>
      </div>
      <div className="grid content-start grid-cols-1 col-span-9 gap-10 pt-20 pb-20 md:grid-cols-3">
        {isLoading && <div>Loading...</div>}
        {error ? (
          <CoreAlert variant="error">{error.data.message}</CoreAlert>
        ) : (
          <>
            {data?.data?.map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
