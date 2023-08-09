import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: false,
    },
    reducers: {
        SetLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { SetLoading } = loaderSlice.actions

export default loaderSlice.reducer