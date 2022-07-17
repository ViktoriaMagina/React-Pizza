
import qs from 'qs';
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import {useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";



import Sort, { menuList } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaBlockLoader from '../components/PizzaBlock/PizzaBlockLoader';
import Pagination from "../components/Pagination";



const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false)
    const {categoryId, sortType, currentPage, searchValue}  = useSelector(state => state.filter)
    const items  = useSelector(state => state.pizzas.items)
    const isLoading = useSelector(state => state.pizzas.isLoading)


    const getPizzas = async () => {
        dispatch(fetchPizzas({
          currentPage,
          sortType,
          categoryId, 
          searchValue
        }))
    }

    React.useEffect(()=> {
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1));
        const sortType = menuList.find(obj => obj.sortProperty === params.sortType)
        dispatch(setFilters({
          ...params,
          sortType
        }))
        isSearch.current = true;
      }
    }, [])

    React.useEffect(()=> {
      if(!isSearch.current){
        getPizzas()
      }
      isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])

    React.useEffect(()=> {
      if(isMounted.current){
        const queryString = qs.stringify({
          sortType: sortType.sortProperty,
          categoryId,
          currentPage
        }) 
        navigate(`?${queryString}`)
      }
      isMounted.current = true
    }, [categoryId, sortType, currentPage])
    
    const onChangePage = (number) => {
      dispatch(setCurrentPage(number))
    }

    return(
        <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {isLoading === 'error' ? 
            (<div>Мы не смогли загрузить пиццы</div>) : 
            (<div className="content__items">
              {isLoading === 'loading' ? [...new Array(4)].map((_, index)=> <PizzaBlockLoader key={index}/>) : items.map((pizza) => <Link key={pizza.id} to={`/pizza/` + pizza.id}><PizzaBlock {...pizza} /></Link>  )}
            </div>)}
            <Pagination setCurrentPage={onChangePage}/>
        </div>
    )
}
export default Home;