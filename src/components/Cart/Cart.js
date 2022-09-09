import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {

  const cartContext = useContext(CartContext);
  const items = cartContext.items;

  const cartItemAddHandler = (item) => {
    cartContext.addItem({...item, amount: 1});
  };
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItens = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        ></CartItem>
      ))}
    </ul>
  );

  const closeModalHandler = () => {
    props.onCloseCart();
  };

  return (
    <Modal onCloseCart={closeModalHandler}>
      {cartItens}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartContext.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeModalHandler}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
