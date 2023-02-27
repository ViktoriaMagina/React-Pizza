import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface initialState{
  pizzasSortType: {
    name: string;
    sortProperty: string;
  },
  pizzasCategory: {
    value: number
  },
  pizzasSearch: {
    text: string;
  }
  pizzasPage: {
    selected: number
  }
}

export const pizzasListTypes = [
  {name: "популярности", sortProperty: 'rating'},
  {name: "цене", sortProperty: 'price'},
  {name: "алфавиту", sortProperty: 'title'},
]
export const pizzasListCategories:string [] = ["Все" , "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]

const initialState: initialState = {
  pizzasSortType: {
    name: "популярности", 
    sortProperty: 'rating'
  },
  pizzasCategory: {
    value: 0
  },
  pizzasSearch: {
    text: ""
  },
  pizzasPage: {
    selected: 1
  }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      changeType: (state, action: PayloadAction<{name: string; sortProperty: string;}>) => {
        state.pizzasSortType = action.payload
        state.pizzasPage.selected = 1
      },
      changeCategory: (state, action: PayloadAction<number>) => {
        state.pizzasCategory.value = action.payload
        state.pizzasPage.selected = 1
      },
      changeSearchText: (state, action: PayloadAction<string>) => {
        state.pizzasSearch.text = action.payload
        state.pizzasPage.selected = 1
      },
      changePage: (state, action: PayloadAction<number>) => {
        state.pizzasPage.selected = action.payload + 1
      },
    },
})

export const {changeType, changeCategory, changeSearchText, changePage} = filterSlice.actions
export default filterSlice.reducer