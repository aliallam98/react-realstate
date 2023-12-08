import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import userReducers from './user/userSlice'


const rootReducer = combineReducers({
  user:userReducers
})

const persistConfig ={
  key :"root",
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer:persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})


export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch