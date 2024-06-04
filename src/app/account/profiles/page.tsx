import { Suspense } from 'react';
import CreateNewProfile from './CreateNewProfile';
import ProfileList from './ProfileList';

const ProfilePage = async () => {
  return (
    <div>
      <h1 className="text-xl font-bold p-8">MIS PERFILES</h1>
      <Suspense fallback={<div>Cargando...</div>}>
        <ProfileList />
      </Suspense>
      <CreateNewProfile />
    </div>
  );
};

export default ProfilePage;
