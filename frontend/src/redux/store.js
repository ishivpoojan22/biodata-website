import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/api'
import profileReducer from './slices/profileSlice'
import templateReducer from './slices/templateSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    template: templateReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// Enables refetchOnFocus / refetchOnReconnect behaviours for RTK Query.
setupListeners(store.dispatch)
