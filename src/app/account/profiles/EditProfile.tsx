'use client';
import { appModal } from '@/services/modals/appModal';
import { Profile } from '@/utils/types/profile.interface';
import { FC, useState } from 'react';
import { updateProfile } from './actions';

interface Props {
  profile: Profile;
}
const EditProfile: FC<Props> = ({ profile }) => {
  const handleEdit = () => {
    appModal.fire({
      html: <EditProfileModal profile={profile} />,
    });
    console.log('Edit Profile', profile);
  };

  return <button onClick={handleEdit}>EditProfile</button>;
};

export default EditProfile;

interface EditModalProps {
  profile: Profile;
}
const EditProfileModal: FC<EditModalProps> = ({ profile }) => {
  const [form, setForm] = useState({
    profile_name: profile.profile_name,
    birth_date: profile.birth_date,
  });
  const onSubmit = async () => {
    const { data, error } = await updateProfile(form, profile.id);

    console.log(error, data);
  };

  return (
    <form>
      <h4>EDITA TU PERFIL</h4>
      <input
        type="text"
        defaultValue={form.profile_name}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, profile_name: e.target.value }))
        }
      />
      <input
        type="date"
        defaultValue={form.birth_date || ''}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, birth_date: e.target.value }))
        }
      />
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
};
