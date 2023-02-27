import React from 'react';
import ReactPaginate from 'react-paginate';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';


import Sort from '../../components/Sort';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import PizzaLoader from '../../components/PizzaLoader';
import ErrorLoading from '../../components/ErrorLoading';

import { pizzasListCategories, changePage } from '../../redux/slices/filterSlice';
import { getFetchPizzas} from '../../redux/slices/pizzasSlice';




const Home = () => {
    const pizzas = useSelector((state: RootState) => state.pizzas.pizzas);
    const pizzasCount = useSelector((state: RootState) => state.pizzas.pizzasCount);
    const isPizzaLoading = useSelector((state: RootState) => state.pizzas.status);
  
    const pizzasSortType = useSelector((state: RootState) => state.filter.pizzasSortType);
    const pizzasCategory = useSelector((state: RootState) => state.filter.pizzasCategory).value;
    const pizzasSearch = useSelector((state: RootState) => state.filter.pizzasSearch).text;
    const pizzasPage = useSelector((state: RootState) => state.filter.pizzasPage).selected;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchPizzas = async () => {
      //@ts-ignore
      dispatch(getFetchPizzas({ pizzasPage, pizzasSearch, pizzasCategory, pizzasSortType }));
    };
  
    React.useEffect(() => {
      fetchPizzas();
      window.scrollTo(0, 0);
    }, [pizzasSortType, pizzasCategory, pizzasPage, pizzasSearch]);
  
    React.useEffect(() => {
      const queryStringUrl = qs.stringify({
        category: pizzasCategory,
        type: pizzasSortType.sortProperty,
        search: pizzasSearch,
        page: pizzasPage,
      });
      navigate(`?${queryStringUrl}`);
    }, [pizzasSortType, pizzasCategory, pizzasPage, pizzasSearch]);
  
    return (
        <>
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">{pizzasListCategories[pizzasCategory]} пиццы</h2>
        <div className="content__items">
          {isPizzaLoading === 'failed' ? (
            <ErrorLoading />
          ) : isPizzaLoading === 'pending' ? (
            [...new Array(4)].map(() => <PizzaLoader key={uniqid()} />)
          ) : (
            pizzas.map((pizza) => {
              return (
                <PizzaBlock
                  key={pizza.id}
                  name={pizza.title}
                  id={pizza.id}
                  price={pizza.price}
                  imageUrl={pizza.imageUrl}
                  sizes={pizza.sizes}
                  types={pizza.types}
                />
              );
            })
          )}
        </div>
        <ReactPaginate
          className='navigate-paginate'
          key={uniqid()}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => dispatch(changePage(e.selected))}
          pageRangeDisplayed={4}
          pageCount={Math.ceil(pizzasCount / 4)}
          previousLabel="<"
          forcePage = {pizzasPage - 1}
        />
      </>
    );
  };
  
  export default Home;
  