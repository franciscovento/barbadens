import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return NextResponse.json({ error: userError, data: null });
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*');
  if (profileError) {
    return NextResponse.json({ error: profileError, data: profileData });
  }

  const user = {
    email: userData.user.email,
    id: userData.user.id,
    type: userData.user.user_metadata.type,
  };

  const profiles = profileData;

  return NextResponse.json({
    data: {
      user,
      profiles,
    },
    error: null,
  });
}
