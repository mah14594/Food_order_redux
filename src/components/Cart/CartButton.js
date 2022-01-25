import classes from "./CartButton.module.css";
import { UIActions } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
const CartButton = (props) => {
  const dispatchHandler = useDispatch();
  const toggleCartHandler = () => {
    dispatchHandler(UIActions.toggleCart());
  };
  const cartitems = useSelector((state) => state.cartReducer.items);
  const CartAmount = cartitems.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{CartAmount}</span>
    </button>
  );
};

export default CartButton;
