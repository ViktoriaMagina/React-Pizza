import axios from 'axios';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch  } from '../store';


type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
};

interface initialState{
    pizza: Pizza,
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
}

export const getFetchPizza = createAsyncThunk(
    'pizzas/fetchById', 
    async (idParams: string) => {
        let {data} = await axios.get(
          `https://62b089f0196a9e987025fbef.mockapi.io/items?id=${idParams}`,
        )
        return data[0]
    }
)
  
const initialState: initialState = {
    pizza: {} as Pizza,
    status: "idle",
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFetchPizza.fulfilled, (state, action) => {
            state.pizza = action.payload
            state.status = 'succeeded'
            
        })
        builder.addCase(getFetchPizza.pending, (state) => {
            state.status = 'pending'
            state.pizza = {} as Pizza
        })
        builder.addCase(getFetchPizza.rejected, (state) => {
            state.status = 'failed'
            state.pizza = {} as Pizza
        })
    },
})
export default pizzaSlice.reducer