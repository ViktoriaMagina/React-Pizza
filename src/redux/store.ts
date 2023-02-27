import { configureStore } from '@reduxjs/toolkit'
import filterReduser from './slices/filterSlice'
import cartReduser from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlice'
import pizzaSlice from './slices/pizzaSlice'

export const store = configureStore({
  reducer: {
    filter: filterReduser,
    cart: cartReduser,
    pizzas: pizzasSlice,
    pizza: pizzaSlice,
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch