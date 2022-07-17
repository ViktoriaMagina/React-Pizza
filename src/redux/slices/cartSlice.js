import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState, 
  reducers: {
    addProduct(state, action){
        const findItem =  state.items.find((item)=> item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)
        if(findItem){
            findItem.count++
        }
        else{
            state.items.push({
                ...action.payload,
                count: 1
            });
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum
        }, 0)
    },
    removeProduct(state, action){
        state.items.filter(item => item.id !== action.payload.id && item.type !== action.payload.type && item.size !== action.payload.size);
    },
    clearItems(state){
        state.items = []
        state.totalPrice = 0
    },
    incrementItem(state, action){
        const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)
        if(findItem.count < 20){
            findItem.count++
        }
    },
    decrementItem(state, action){
        const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size)
        if(findItem.count > 1){
            findItem.count--
        }
    }
  }
})

export const selectCart = state => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id)

export const {addProduct, removeProduct, clearItems, decrementItem, incrementItem} = cartSlice.actions

export default cartSlice.reducer

