'use client';

import { FormEvent, useEffect, useState } from 'react';
import Button from './ui/Button';
import api from '@/lib/axios';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const AddFriendButton = ({}) => {
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: { email: '' },
  });

  const email = watch('email');

  useEffect(() => {
    if (email) {
      setRequestSuccess(false);
      setRequestError(null);
    }
  }, [email]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: responseData } = await api.post('/api/user/request', {
        email: data.email,
      });
      setRequestError(null);
      setRequestSuccess(true);
    } catch (error) {
      setRequestSuccess(false);
      if (error instanceof AxiosError) {
        if (error.response) {
          setRequestError(error.response.data);
        } else if (error.request) {
          setRequestError('Network error');
        } else {
          setRequestError('Something went wrong');
        }
      } else {
        setRequestError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  console.log({ isSubmitted });

  useEffect(() => {
    if (!requestSuccess) return;
    reset();
  }, [requestSuccess, reset]);

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold">Add a friend</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded mt-7 flex items-center gap-4"
        >
          <div>
            <input
              className="shadow focus:ring-2 placeholder:text-gray-400  appearance-none border rounded w-[300px] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              {...register('email')}
            />
          </div>

          <Button size={'lg'} isLoading={loading} type="submit">
            Add
          </Button>
        </form>
        <p className="text-sm text-red-600 mt-2">{errors.email?.message}</p>

        {requestError && (
          <p className="text-sm text-red-600 mt-2">{requestError}</p>
        )}
        {requestSuccess && (
          <p className="text-sm text-green-600 mt-2">{`Request sent successfuly`}</p>
        )}
      </div>
    </>
  );
};

export default AddFriendButton;
