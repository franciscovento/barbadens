import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTION_URL } from '../../../../constants';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const appUrl = process.env.NEXT_PUBLIC_BASE_URL || PRODUCTION_URL;
    const returnTo = searchParams.get('returnTo');
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data) throw error;

    return NextResponse.redirect(returnTo ? returnTo : appUrl);
  } catch (error: any) {
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_BASE_URL + '/auth/login'
    );
  }
}
