'use client';

import { Profile } from '@/utils/types/profile.interface';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createProfile } from './actions';

export type ProfileForm = Pick<Profile, 'profile_name' | 'birth_date'>;

const CreateNewProfile = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<ProfileForm>({
    defaultValues: {
      birth_date: '',
      profile_name: '',
    },
  });

  const onSubmit = async (formData: ProfileForm) => {
    try {
      await createProfile(formData);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('profile_name')} />
      <input type="date" {...register('birth_date')} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateNewProfile;
