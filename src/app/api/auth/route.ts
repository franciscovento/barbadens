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

  const user = {
    email: authUser.user.email,
    id: authUser.user.id,
    type: authUser.user.user_metadata.type,
  };

  return NextResponse.json({
    data: {
      user,
    },
    error: null,
  });
}
