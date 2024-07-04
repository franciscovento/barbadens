import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = await request.json();

  const { data: authUser, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    return NextResponse.json({
      data: authUser,
      error: {
        ...authError,
        message: 'Credenciales no válidas',
      },
    });
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*');
  if (profileError) {
    return NextResponse.json({ error: profileError, data: profileData });
  }

  const user = {
    email: authUser.user.email,
    id: authUser.user.id,
    type: authUser.user.user_metadata.type,
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
