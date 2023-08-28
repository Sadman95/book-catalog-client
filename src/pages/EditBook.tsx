'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/books/booksApi';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IBook } from '@/types/globalTypes';

const formSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  author: z.string({
    required_error: 'Author is required',
  }),
  genre: z.string({
    required_error: 'Genre is required',
  }),
  publicationDate: z.date({
    required_error: 'Publication date is required',
  }),
});

export default function EditBook() {
  const { id } = useParams();
  const [bookData, setBookData] = useState<IBook | null>(null);
  const navigate = useNavigate();

  const {
    data,
    isLoading: getBookLoading,
    error: getBookError,
  } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [editBook, { isLoading, isSuccess, error, data: updatedData }] =
    useEditBookMutation();

  useEffect(() => {
    if (data?.data) {
      setBookData(data.data);
    }
  }, [data?.data]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: bookData?.title as string,
      author: bookData?.author as string,
      genre: bookData?.genre as string,
      publicationDate: bookData
        ? (new Date(bookData?.publicationDate!) as Date)
        : new Date(),
    },
    defaultValues: {
      title: bookData?.title,
      author: bookData?.author,
      genre: bookData?.genre,
      publicationDate:
        bookData?.publicationDate && new Date(bookData?.publicationDate!),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    editBook({ id, ...values });
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: updatedData.message,
        duration: 3000,
        variant: 'default',
      });
      navigate(`/books/${id}`);
    }
    if (error) {
      toast({
        title: 'Error',
        description: (error as any).data.message,
        duration: 3000,
        variant: 'destructive',
      });
    }
  }, [error, isSuccess]);

  return (
    <>
      {getBookError && <div>{(getBookError as any).data.message}</div>}
      {getBookLoading ? (
        <div>Loading...</div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/2 pt-32 mx-auto space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter book title"
                      defaultValue={bookData?.title}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author name"
                      defaultValue={bookData?.author}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter genre"
                      defaultValue={bookData?.genre}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publication date</FormLabel>
                  <FormControl>
                    <DatePickerWithPresets
                      date={field.value as Date}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? 'Loading...' : 'Update'}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

/* 

 
              
              
*/
