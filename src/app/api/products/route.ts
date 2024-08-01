import bsaleApi from '@/utils/axios/bsaleApi.utils';
import { createClient } from '@/utils/supabase/server';
import { Product } from '@/utils/types/products.interface';
import { WebDescriptionResponse } from '@/utils/types/webDescription.interface';
import { NextRequest, NextResponse } from 'next/server';
import { PRICE_LIST_ID, STOCK_COST } from '../../../../constants';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { design_id, fabric_id } = await request.json();
    const { data } = await bsaleApi.get<WebDescriptionResponse>(
      `/v2/products/list/market_info.json?&expand=[variantsInfo,variant.salePrice]&priceListId=${PRICE_LIST_ID}&product_id=${fabric_id}`
    );
    if (data.data.length === 0) {
      throw new Error('No data found');
    }
    const productWeb = data.data[0];

    const { data: productData, error: productError } = await supabase
      .from('products')
      .upsert({
        design_id,
        fabric_id,
        name: `${productWeb.name} - Diseño: ${design_id}`,
        price: +productWeb.variants[0].salePrices.finalPrice * STOCK_COST,
        bar_code: productWeb.variants[0].barCode,
        id_variant_default: productWeb.variants[0].id,
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message, data: null });
  }
}
