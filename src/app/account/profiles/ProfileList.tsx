import { createClient } from '@/utils/supabase/server';
import { Profile } from '@/utils/types/profile.interface';
import EditProfile from './EditProfile';

const ProfileList = async () => {
  const supabase = createClient();
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .returns<Profile[]>()
    .order('created_at', { ascending: false });

  return (
    <div>
      {profiles?.map((profile) => (
        <div key={profile.id} className="flex gap-4">
          <p>{profile.profile_name}</p>
          <EditProfile profile={profile} />
        </div>
      ))}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default ProfileList;
