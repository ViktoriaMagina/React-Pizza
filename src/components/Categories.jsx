import React from "react";

import { useSelector, useDispatch } from 'react-redux'


import { setCategoryId} from "../redux/slices/filterSlice";

export default function Categories() {
    const dispatch = useDispatch()

    const categoryId = useSelector(state => state.filter.categoryId)
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    return (
      <div className="categories">
        <ul>
            {categories.map((item, index) => {
                return(
                    <li key={index} onClick={()=> onClickCategory(index)} className={categoryId === index ? "active": ""}>
                        {item}
                    </li>
                )
            })}
        </ul>
      </div>
    );
  }