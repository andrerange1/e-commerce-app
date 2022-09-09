import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { Ref, useRef } from "react";

const MealItemForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    props.onAddToCart(enteredAmountNumber);
  };

  const amountInputRef = useRef();

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "0",
          max: "5",
          step: "1",
          defaultValue: 0,
        }}
      />
      <button type="submit">+Add</button>
    </form>
  );
};

export default MealItemForm;
