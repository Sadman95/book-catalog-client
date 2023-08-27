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
import { IAuth } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { loginAction } from '@/redux/features/auth/authActions';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export default function LoginForm({ toggleAuth, setToggleAuth }: IAuth) {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.auth);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await dispatch(loginAction(values)).then((res) => {
      if (success) {
        toast({
          title: 'Success',
          description: res.payload.message,
          duration: 3000,
          color: 'green',
        });
      } else if (error) {
        toast({
          title: 'Error',
          description: res.payload,
          duration: 3000,
          variant: 'destructive',
          color: 'red',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 pt-32 pr-4 mx-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="eg: johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="•••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? 'Loading...' : 'Login'}
        </Button>
        <br />
        <small className="font-semibold text-slate-500">
          Not having an account?
          <Button onClick={() => setToggleAuth(!toggleAuth)} variant="link">
            Sign up
          </Button>
        </small>
      </form>
    </Form>
  );
}

/* 

 
              
              
*/
