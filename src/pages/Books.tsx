import BookCard from '@/components/books/BookCard';
import { Input } from '@/components/ui/input';
import { useGetBooksQuery } from '@/redux/features/books/booksApi';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';
import CoreSelect from '@/components/core/_select';
import CoreAlert from '@/components/core/_alert';

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
  const { data, isLoading, error } =
    useGetBooksQuery<Record<string, any>>(filters);

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
      <div className="col-span-12 align-top md:h-screen md:col-span-3 grid grid-cols-1 gap-4 pb-20 pt-20">
        <div className="flex-col w-full max-w-sm h-full border-hidden md:border-solid md:border-r-2 border-gray-200 space-x-2">
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
            data={data?.meta?.genres}
            onValueChange={(v) => setFilters({ ...filters, genre: v })}
            placeHolder="Genre"
          />
          <CoreSelect
            data={data?.meta?.years}
            onValueChange={(v) =>
              setFilters({ ...filters, publicationYear: v })
            }
            placeHolder="Year"
          />
        </div>
      </div>
      <div className="col-span-9 content-start grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 pt-20">
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
