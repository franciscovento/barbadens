import { createClient } from '@/utils/supabase/server';
import { PostWithAuthor } from '@/utils/types/post.interface';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createClient();
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, company_users(*)')
      .eq('status', 1)
      .returns<PostWithAuthor[]>();

    if (error) {
      throw error;
    }

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Ocurrió un error' },
      { status: 500 }
    );
  }
}
