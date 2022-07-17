import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async ({categoryId, currentPage, sortType, searchValue}, thunkAPI) => {
    const {data} = await axios.get(`https://62b089f0196a9e987025fbef.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ""}` + `&sortBy=` + sortType.sortProperty + `${searchValue === '' ? ''  : `&search=${searchValue}`}`)
    setItems(data)
    return data
})

const initialState = {
    items: [],
    isLoading: "loading"
}

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState, 
  reducers: {
    setItems(state, action){
        state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
        state.isLoading = 'success'
        state.items = action.payload
    },
    [fetchPizzas.pending]: (state, action) => {
        state.isLoading = 'loading'
        state.items = []
    },
    [fetchPizzas.rejected]: (state, action) => {
        state.isLoading = 'error'
        state.items = []
    }
  }
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer

