import React from "react";
import { addPizza } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectCartByPizza } from '../../redux/slices/cartSlice';
import { Link } from "react-router-dom";
import uniqid from 'uniqid';

interface PizzaBlock {
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
}
let pizzasTypesArray: string[] = ['тонкое', 'традиционное'];

const PizzaBlock = ({ name, price, imageUrl, sizes, types , id}: PizzaBlock) => {
  const [activeType, setActiveType]= React.useState(0);
  const [activeSize, setActiveSize]= React.useState(0);
  const addedCount = useSelector(selectCartByPizza(id, activeType, activeSize, sizes))
  const dispatch = useDispatch()
  const onClickAdd = () => {
    const item = {
      id,
      name,
      price, 
      imageUrl,
      size: sizes[activeSize],
      type: activeType,
      count: 1,
      idMain: uniqid()
    }
    dispatch(addPizza(item))
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/:${id}`}>
      <img className="pizza-block__image" src={imageUrl} alt={name} />
      </Link>
      
      <Link to={`/pizza/:${id}`}>
      <h4 className="pizza-block__title">{name}</h4>
      </Link>
      
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => {
            return <li onClick={()=> setActiveType(i)} className={i=== activeType ? "active": ""} key={i}>{pizzasTypesArray[type]}</li>;
          })}
        </ul>
        <ul>
          {sizes.map((size, i) => {
            return <li onClick={()=> setActiveSize(i)} className={i=== activeSize ? "active": ""} key={i}>{size} см.</li>;
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={() => onClickAdd()} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span >Добавить</span>
          <i>{addedCount? addedCount: 0}</i>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
