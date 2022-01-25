import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialUIstate = { showcart: false, notification: null }; //the name here should be UIState , because we use differnet ui states
const UISlice = createSlice({
  name: "UI",
  initialState: initialUIstate,
  reducers: {
    toggleCart(state) {
      state.showcart = !state.showcart;
    },
    showNotfication(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const initialCartState = {
  items: [],
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addtoCart(state, action) {
      state.totalPrice = state.totalPrice + action.payload.price;
      if (action.payload.itemexist !== -1) {
        state.items[action.payload.itemexist].quantity += 1;
        state.items[action.payload.itemexist].total +=
          state.items[action.payload.itemexist].price;
      } else {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: action.payload.quantity,
          total: action.payload.price,
        });
      }
    },
    additem(state, action) {
      state.totalPrice += state.items[action.payload].price;
      state.items[action.payload].quantity += 1;
      state.items[action.payload].total += state.items[action.payload].price;
    },
    removeitem(state, action) {
      state.totalPrice -= state.items[action.payload].price;
      state.items[action.payload].quantity -= 1;
      state.items[action.payload].total -= state.items[action.payload].price;
      console.log(state.items[action.payload].price);
      if (state.items[action.payload].quantity === 0) {
        const updateitems = state.items.filter((item1) => {
          return item1.id !== state.items[action.payload].id;
        });
        state.items = [...updateitems];
      }
    },
    fecthdata(state, action) {
      state.items = [...action.payload];
    },
  },
});

const Store = configureStore({
  reducer: {
    UIReducer: UISlice.reducer,
    cartReducer: CartSlice.reducer,
  },
});

export const sendCartdata = (Cartitems) => {
  console.log("send");
  return async (dispatch) => {
    dispatch(
      UIActions.showNotfication({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const SendRequest = async () => {
      const response = await fetch(
        "https://foodorder-redux-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(Cartitems),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await SendRequest();
      dispatch(
        UIActions.showNotfication({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        UIActions.showNotfication({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fecthCartdata = () => {
  console.log("fetch");
  return async (dispatch) => {
    const SendRequest = async () => {
      const response = await fetch(
        "https://foodorder-redux-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fecthing cart data failed.");
      }

      const cartdata = await response.json();
      return cartdata;
    };
    try {
      const cartitems = await SendRequest();
      dispatch(cartActions.fecthdata(cartitems));
    } catch (error) {}
  };
};

export const UIActions = UISlice.actions;
export const cartActions = CartSlice.actions;
export default Store;
