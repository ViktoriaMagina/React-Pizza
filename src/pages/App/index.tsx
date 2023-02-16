

import React from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import Sort from '../../components/Sort';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import MyLoader from '../../components/PizzaLoader';

type PizzasType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

const App = () => {
  const [pizzas, setPizzas] = React.useState<PizzasType[]>([]);
  const [isPizzaLoading, setIsPizzaLoading] = React.useState(true);
  const [pizzasType, setPizzasType] = React.useState(0);
  const [pizzasCategory, setPizzasCategory] = React.useState(0);

  React.useEffect(() => {
    setIsPizzaLoading(true);
    let order: string = '';
    switch (pizzasType) {
      case 0:
        order = 'rating';
        break;
      case 1:
        order = 'price';
        break;
      case 2:
        order = 'title';
        break;
    }
    axios
      .get(
        `https://62b089f0196a9e987025fbef.mockapi.io/items?orderby=${order}${
          pizzasCategory !== 0 ? `&category=${pizzasCategory}` : ''
        }`,
      )
      .then((items) => {
        setPizzas(items.data)
        setIsPizzaLoading(false)
      })
      .catch((error) => {
        alert('Ошибка при загрузке пицц: ' + error.message);
      });
      
  }, [pizzasType, pizzasCategory]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories pizzasCategory={pizzasCategory} setPizzasCategory={setPizzasCategory} />
            <Sort pizzasType={pizzasType} setPizzasType={setPizzasType} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isPizzaLoading ? [...new Array(4)].map(()=><MyLoader />) : pizzas.map((pizza)=> {
              return(
                <PizzaBlock
                key={pizza.id}
                pizzaName={pizza.title}
                pizzaPrice={pizza.price}
                pizzaImgUrl={pizza.imageUrl}
                pizzaSizes={pizza.sizes}
                pizzaTypes={pizza.types}
              />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
