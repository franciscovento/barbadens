import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import { GetVariantResponse } from '@/utils/types/bsale/variant.interface';
import { Product } from '@/utils/types/products.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { design_id, fabric_id } = await request.json();
  let name;
  let barCode = null;
  let price = 270;
  try {
    const { data } = await bsaleApi.get<GetVariantResponse>(
      `/v1/variants/${fabric_id}.json?expand=[product]`
    );
    name = `${data.product.name} - Diseño: ${design_id}`;
    barCode = data.barCode;
  } catch (error) {
    name = `Tela ${fabric_id} - Diseño: ${design_id}`;
  }

  const { data: productData, error: productError } = await supabase
    .from('products')
    .upsert({
      design_id,
      fabric_id,
      name,
      price,
      bar_code: barCode,
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
