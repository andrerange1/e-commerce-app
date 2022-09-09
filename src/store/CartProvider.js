import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const items = [...state.items];

  let updatedItem;
  let updatedItems;
  let updatedTotalAmount;

  if (action.type === "ADD") {
    const existingCartItemIndex = items.findIndex(
      (e) => e.id === action.item.id
    );

    const existingItem = items[existingCartItemIndex];

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.item };
      updatedItems = items.concat(action.item);
    }

    updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
  }

  if (action.type === "REMOVE") {

    const existingCartItemIndex = items.findIndex(e=>e.id === action.id);
    let item = items[existingCartItemIndex];

    if (item.amount > 1) {
      updatedItem = {
        ...item,
        amount: item.amount - 1,
      };
      updatedItems = [...items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = items.filter(e=>e.id!==action.id);
    }

    updatedTotalAmount = state.totalAmount - item.price;
  }

  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
  };

  // return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    if (item.amount > 0) dispatchCartAction({ type: "ADD", item: item });
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
