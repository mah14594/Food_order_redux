import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store";
const CartItem = (props) => {
  const CartItems = useSelector((state) => state.cartReducer.items);
  const dispatchHandler = useDispatch();
  const { id, title, quantity, total, price } = props.item;
  const itemindex = CartItems.findIndex((item) => {
    return item.id === id;
  });
  // const cartitem = CartItems[itemindex];
  const Additemhandler = () => {
    dispatchHandler(cartActions.additem(itemindex));
  };

  const removeitemHandler = () => {
    dispatchHandler(cartActions.removeitem(itemindex));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>

        <div className={classes.actions}>
          <button onClick={removeitemHandler}>-</button>
          <button onClick={Additemhandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
