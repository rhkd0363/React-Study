import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-study-9ecaa-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("error");
      }

      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const cartData = await fetchData();
      console.log(cartData);
      dispatch(cartActions.replaceCart(cartData));
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending..",
        message: "sending data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-study-9ecaa-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "error",
        })
      );
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "success",
        message: "success",
      })
    );
  };
};
