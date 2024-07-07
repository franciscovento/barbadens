import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const user = {
      email: userData.user.email,
      id: userData.user.id,
      first_name: userData.user.user_metadata.first_name,
      last_name: userData.user.user_metadata.last_name,
    };

    return NextResponse.json({
      data: {
        user,
      },
      error: null,
    });
  } catch (error) {
    return NextResponse.json({ error: error, data: null });
  }
}
