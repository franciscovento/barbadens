import { createClient } from '@/utils/supabase/server';
import { CartProductWithProduct } from '@/utils/types/cart.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cart')
    .select(
      '*, cart_product(*, products(name, id_variant_default), profiles(profile_name))'
    )
    .order('id', { ascending: false })
    .returns<CartProductWithProduct[]>();

  return NextResponse.json({
    data,
    error,
  });
}

// export async function POST(request: NextRequest) {
//   const supabase = createClient();
//   const { profile_id, design_id, fabric_id } = await request.json();

//   const { data: cart, error: cartError } = await supabase
//     .from('cart')
//     .select('*')
//     .returns<Cart[]>();

//   if (cartError) {
//     return NextResponse.json({
//       data: cart,
//       error: cartError,
//     });
//   }

//   if (cart.length === 0) {
//     const { data: cartData, error: cartError } = await supabase
//       .from('cart')
//       .insert({})
//       .select('*')
//       .returns<Cart[]>();
//     if (cartError) {
//       return NextResponse.json({
//         data: cartData,
//         error: cartError,
//       });
//     }

//     const { data: cartProductData, error: cartProductError } = await supabase
//       .from('cart_product')
//       .insert({
//         cart_id: cartData[0].id,
//         profile_id,
//         fabric_id,
//         design_id,
//       })
//       .select('*')
//       .returns<CartProduct[]>();

//     if (cartProductError) {
//       return NextResponse.json({
//         data: cartProductData,
//         error: cartProductError,
//       });
//     }

//     return NextResponse.json({
//       data: cartProductData,
//       error: cartProductError,
//     });
//   }

//   const { data: cartProductData, error: cartProductError } = await supabase
//     .from('cart_product')
//     .insert({
//       profile_id,
//       fabric_id,
//       design_id,
//       cart_id: cart[0].id,
//     })
//     .select('*')
//     .returns<CartProduct[]>();

//   if (cartProductError) {
//     return NextResponse.json({
//       data: cartProductData,
//       error: cartProductError,
//     });
//   }

//   return NextResponse.json({
//     data: cartProductData,
//     error: cartProductError,
//   });
// }

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { profile_id, design_id, fabric_id } = await request.json();
    const { data, error } = await supabase.rpc('add_product_to_cart', {
      profile_id,
      design_id,
      fabric_id,
    });

    return NextResponse.json({
      data,
      error,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        data: null,
      },
      { status: 500 }
    );
  }
}
