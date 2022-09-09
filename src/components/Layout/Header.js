import React, { Fragment } from "react";
import mealsImagem from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  const showCartHandler = () => {
    props.onOpenCart();
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={showCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImagem} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
