import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import useCart from '@/utils/hooks/useCart.hooks';

const Cart = () => {
  const { cart_products } = useCart();
  return (
    <div>
      <StepTitle title="Carrito" />
      <div>
        {cart_products?.map((product) => (
          <p key={product.fabric_id}>{product.products.fabrics.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Cart;
