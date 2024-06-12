import { createClient } from '@/utils/supabase/server';
import { Product } from '@/utils/types/products.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { design_id, fabric_id } = await request.json();

  const { data: productData, error: productError } = await supabase
    .from('products')
    .upsert({
      design_id,
      fabric_id,
    })
    .select()
    .returns<Product[]>();

  if (productError) {
    return NextResponse.json({ error: productError, data: null });
  }

  return NextResponse.json({
    data: productData,
    error: null,
  });
}
