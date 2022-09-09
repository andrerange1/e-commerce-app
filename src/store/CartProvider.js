import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const items = [...state.items];
  if (action.type === "ADD") {
    if (
      items.filter((item) => {
        return item.name === action.item.name;
      }).length === 0
    ) {
      const updatedItems = items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      items.forEach(e => {
        if(e.name === action.item.name) {
          e.amount = e.amount + action.item.amount/2;
        }
      });
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: items,
        totalAmount: updatedTotalAmount,
      };
    }
  }

  if (action.type === "REMOVE") {
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    if(item.amount > 0)
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
