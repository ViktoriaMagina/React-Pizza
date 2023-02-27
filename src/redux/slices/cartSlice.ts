import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const pizzasTypesArray: string[] = ['тонкое', 'традиционное'];
import type { RootState } from '../../redux/store';

interface PizzaBlock {
    name: string;
    price: number;
    imageUrl: string;
    size: number;
    type: number;
    id: string;
    count: number;
    idMain: string;
}

interface initialState{
    totalCount: number,
    totalPrice: number,
    addedPizzas: PizzaBlock[]
}


const initialState: initialState = {
    totalCount: 0,
    totalPrice: 0,
    addedPizzas: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addPizza: (state, action: PayloadAction<PizzaBlock>) => {
        const findItem = state.addedPizzas.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)
        if(findItem){
            findItem.count++
        }
        else{
            state.addedPizzas.push(action.payload)
        }
        state.totalCount = state.addedPizzas.reduce((sum, obj) => {
            return sum + obj.count
        }, 0)
        state.totalPrice = state.addedPizzas.reduce((sum, obj) => {
            return sum + obj.price * obj.count
        }, 0)
      },
      decrementPizza: (state, action: PayloadAction<PizzaBlock>) => {
        if(action.payload.count <= 1){
            state.addedPizzas = state.addedPizzas.filter(item => item.idMain !== action.payload.idMain)
        }
        else{
            state.addedPizzas.forEach(item => {
                if(item.idMain === action.payload.idMain){
                    item.count--
                }
            })
        }
        state.totalCount = state.addedPizzas.reduce((sum, obj) => {
            return sum + obj.count
        }, 0)
        state.totalPrice = state.addedPizzas.reduce((sum, obj) => {
            return sum + obj.price * obj.count
        }, 0)
      },
      removePizza: (state, action: PayloadAction<PizzaBlock>) => {
        state.addedPizzas = state.addedPizzas.filter(item => item.idMain !== action.payload.idMain)
        state.totalCount = state.addedPizzas.reduce((sum, obj) => {
            return sum + obj.count
        }, 0)
        state.totalPrice = state.addedPizzas.reduce((sum, obj) => {
            return sum + obj.price * obj.count
        }, 0) 
      },
      clearPizzas: (state) => {
        state.addedPizzas = []
        state.totalCount = 0
        state.totalPrice = 0
      },
    },
})

export const selectCart = (state: RootState)  => state.cart
export const selectCartPizzas = (state: RootState)  => state.cart.addedPizzas
export const selectCartByPizza = (id: string, activeType: number, activeSize: number, sizes: number[]) => (state: RootState)  => state.cart.addedPizzas.find(item => item.id === id && item.type === activeType && item.size === sizes[activeSize])?.count
export const selectCartTotalCount = (state: RootState)  => state.cart.totalCount
export const selectCartTotalPrice = (state: RootState)  => state.cart.totalPrice
export const pizzaByIdCount = (id: string) => (state: RootState)  => state.cart.addedPizzas.filter(item=> item.id === id)[0].count

export const {addPizza, removePizza, clearPizzas, decrementPizza} = cartSlice.actions
export default cartSlice.reducer