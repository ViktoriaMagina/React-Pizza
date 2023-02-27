import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { getFetchPizza } from '../../redux/slices/pizzaSlice';
import { pizzasTypesArray } from '../../redux/slices/cartSlice';
import { addPizza } from '../../redux/slices/cartSlice';
import { selectCartByPizza } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { PizzaPageImgLoader } from '../../components/PizzaPageLoader';
import uniqid from 'uniqid';


const FullPizza: React.FC = () => {
  const {title, price, imageUrl, id, sizes,types } = useSelector((state: RootState) => state.pizza.pizza);
  let params = useParams();
  const idParams =  params.id?.substring(1);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.pizza.status)

  React.useEffect(() => {
    //@ts-ignore
    dispatch(getFetchPizza(idParams));
  }, []);

  const [activeType, setActiveType]= React.useState(0);
  const [activeSize, setActiveSize]= React.useState(0);
  const addedCount = useSelector(selectCartByPizza(id, activeType, activeSize, sizes))

  const onClickAdd = () => {
    const item = {
      id,
      name: title,
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
    
    <div className="content full-pizza">
      
      <div className="full-pizza__left">
      <Link to="/" className="button">
          <span>Вернуться к каталогу</span>
        </Link>
        {status !== "succeeded" ? <PizzaPageImgLoader/> : (<img className='full-pizza__img' src={imageUrl} alt="" />)}
      
      </div>
      <div className="full-pizza__right">
      <h2 className='full-pizza__title'>{title}</h2>
      <p className='full-pizza__price'>{price} ₽</p>
      <div className="pizza-block__selector">
        <ul>
          {types?.map((type, i) => {
            return <li onClick={()=> setActiveType(i)} className={i=== activeType ? "active": ""} key={i}>{pizzasTypesArray[type]}</li>;
          })}
        </ul>
        <ul>
          {sizes?.map((size, i) => {
            return <li onClick={()=> setActiveSize(i)} className={i=== activeSize ? "active": ""} key={i}>{size} см.</li>;
          })}
        </ul>
      </div>
      <div className="button button--outline button--add">
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
          <span onClick={() => onClickAdd()}>Добавить</span>
          <i>{addedCount? addedCount: 0}</i>
        </div>
      </div>
    </div>
  );
};
export default FullPizza;
