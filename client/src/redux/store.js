import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;