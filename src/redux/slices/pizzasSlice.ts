import axios from 'axios';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

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
type fetchProps = {
    pizzasSortType: {
        name: string;
        sortProperty: string;
    },
    pizzasCategory: number;
    pizzasSearch: string;
    pizzasPage: number;
}
interface initialState{
    pizzas: Pizza[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    pizzasCount: number,
}

export const getFetchPizzas = createAsyncThunk(
    'pizzas/fetchByPizzas',
    async ({pizzasSortType, pizzasCategory, pizzasSearch, pizzasPage}: fetchProps) => {
        let res = await axios.get(
          `https://62b089f0196a9e987025fbef.mockapi.io/items?sortby=${pizzasSortType.sortProperty}${
            pizzasCategory !== 0 ? `&category=${pizzasCategory}` : ''
          }&title=${pizzasSearch}&limit=4&page=${pizzasPage}`,
        )
        let resCount = await axios.get(
            `https://62b089f0196a9e987025fbef.mockapi.io/items?sortby=${pizzasSortType.sortProperty}${
              pizzasCategory !== 0 ? `&category=${pizzasCategory}` : ''
            }&title=${pizzasSearch}&page=${pizzasPage}`,
        )
        let resData = res.data
        let resCountData = resCount.data.length
        return {resData, resCountData}
    }
  )

// export const getFetchPizza = createAsyncThunk(
//     'pizzas/fetchById', 
//     async (id) => {
//         let {data} = await axios.get(
//           `https://62b089f0196a9e987025fbef.mockapi.io/items?title=${id}`,
//         )
//         return {data}
//     }
// )
  
const initialState: initialState = {
    pizzas: [],
    pizzasCount: 0,
    status: "idle",
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload.resData
            state.pizzasCount = action.payload.resCountData
            state.status = 'succeeded'
        })
        builder.addCase(getFetchPizzas.pending, (state) => {
            state.status = 'pending'
            state.pizzas = []
            state.pizzasCount = 0
        })
        builder.addCase(getFetchPizzas.rejected, (state) => {
            state.status = 'failed'
            state.pizzas = []
            state.pizzasCount = 0
        })
    },
})
export default pizzasSlice.reducer