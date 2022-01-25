import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartdata, fecthCartdata } from "./Store/index";
let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.UIReducer.showcart);
  const Cartitems = useSelector((state) => state.cartReducer.items);
  const dispatchhandler = useDispatch();
  const notifiaction = useSelector((state) => state.UIReducer.notification);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatchhandler(sendCartdata(Cartitems));
  }, [Cartitems, dispatchhandler]);

  useEffect(() => {
    dispatchhandler(fecthCartdata());
    isInitial = true;
  }, [dispatchhandler]); //redux toolkit ensure that the dispatch handler will never change , so its ok !
  return (
    <Fragment>
      {notifiaction && (
        <Notification
          status={notifiaction.status}
          title={notifiaction.title}
          message={notifiaction.message}
        />
      )}

      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
