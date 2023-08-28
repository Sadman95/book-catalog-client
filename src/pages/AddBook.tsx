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
import { useCreateBookMutation } from '@/redux/features/books/booksApi';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function AddBook() {
  const [createBook, { isLoading, isSuccess, error, data }] =
    useCreateBookMutation();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publicationDate: new Date(),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createBook(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: data.message,
        duration: 3000,
        variant: 'default',
      });
      navigate('/books');
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
                <Input placeholder="Enter book title" {...field} />
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
                <Input placeholder="Enter author name" {...field} />
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
                <Input placeholder="Enter genre" {...field} />
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
          {isLoading ? 'Loading...' : 'Add book'}
        </Button>
      </form>
    </Form>
  );
}

/* 

 
              
              
*/
