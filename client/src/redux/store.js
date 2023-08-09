import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import loaderSlice from './loaderSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        loading: loaderSlice,
    },
});

export default store;