import React from "react"
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { changeCategory, pizzasListCategories ,changePage} from '../../redux/slices/filterSlice'
import { useWhyDidYouUpdate } from 'ahooks';

const Categories = () => {
  const pizzasCategory = useSelector((state: RootState) => state.filter.pizzasCategory)
  const dispatch = useDispatch()
  // useWhyDidYouUpdate("Categories")
  const pizzasCategoryHandler = (i: number) => {
    dispatch(changeCategory(i))
    dispatch(changePage(0))
  }
    return(
        <div className="categories">
        <ul>
          {pizzasListCategories.map((category,i) => {
            return(
              <li onClick={()=> pizzasCategoryHandler(i)} key={i} className={i === pizzasCategory.value ? "active" : ""}>{category}</li>
            )
          })}
          
        </ul>
      </div>
    )
}
export default Categories