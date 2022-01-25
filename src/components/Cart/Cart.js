import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const CartItemsList = useSelector((state) => state.cartReducer.items);
  const CartTotalPrice = useSelector((state) => state.cartReducer.totalPrice);
  let content = "No items in your Cart Yet";
  if (CartItemsList.length > 0) {
    content = CartItemsList.map((item) => {
      return (
        <ul key={item.id}>
          <CartItem
            totalPrice={CartTotalPrice}
            item={{
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              total: item.total,
              price: item.price,
            }}
          />
        </ul>
      );
    });
  }
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {content}
      <div className={classes.quantity}>
        total: $<span>{CartTotalPrice}</span>
      </div>
    </Card>
  );
};

export default Cart;
