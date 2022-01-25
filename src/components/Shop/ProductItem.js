import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store";

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const Cartitems = useSelector((state) => state.cartReducer.items);
  const dispatchHandler = useDispatch();

  const AddtoCartHandler = () => {
    const itemexists = Cartitems.findIndex((item) => item.id === id);

    const data = {
      id: id,
      title: title,
      price: price,
      quantity: 1,
      itemexist: itemexists,
    };
    dispatchHandler(cartActions.addtoCart(data));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddtoCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
