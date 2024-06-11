'use client';
import {
  addProductToCart,
  getCart,
} from '@/services/api/supabase/cart.services';
import { Button } from '@material-tailwind/react';
import { useEffect } from 'react';

const TestPage = () => {
  const postCartItem = async () => {
    const { data, error } = await addProductToCart({
      design_id: 110,
      fabric_id: 1,
      profile_id: 'a24922ef-17e9-434e-b1e1-9753b294c351',
      user_id: 'f36c4ef5-a33d-4c91-ae42-0f29a756a820',
    });
    console.log({
      data,
      error,
    });
  };

  useEffect(() => {
    const getUserCart = async () => {
      const { data, error } = await getCart();
      console.log(data, error);
    };
    getUserCart();
  }, []);

  return <Button onClick={postCartItem}>page</Button>;
};

export default TestPage;
