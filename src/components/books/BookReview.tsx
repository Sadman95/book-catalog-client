'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { FC, useEffect } from 'react';
import Reviews from './Reviews';
import { usePostReviewMutation } from '@/redux/features/books/booksApi';
import { IReview } from '@/types/globalTypes';

const FormSchema = z.object({
  comment: z.string({
    required_error: 'Review is required',
  }),
});

const BookReview: FC<{ bookId: string; reviews: IReview[] }> = ({
  bookId,
  reviews,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [postReview, { isLoading, error, isSuccess, isError, data }] =
    usePostReviewMutation();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { comment } = data;

    postReview({
      id: bookId,
      data: comment,
    });
    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: data.message,
        duration: 3000,
        variant: 'default',
      });
    }
    if (isError) {
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 w-screen gap-4 p-4 space-y-6 align-baseline"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment a review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your comment here..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Form>
      {reviews?.length > 0 && <Reviews data={reviews} />}
    </>
  );
};

export default BookReview;
