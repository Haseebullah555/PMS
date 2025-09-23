// -- name: roleSlice.
// -- date: 01-21-2024.
// -- desc: redux toolkit slice for the roles components.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import bookService from './bookService'

type bookSate = {
  books: any
}

const initialState: bookSate = {
  books: {
    data: [],
  },
}

//get book from server
export const getBook = createAsyncThunk('api/book/fgh', async (params: any, thunkAPI) => {
  try {
    return await bookService.getBooks(params)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// store book
export const storeBook = createAsyncThunk('api/book/store', async (formData: any, thunkAPI) => {
  try {
    return await bookService.store(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// update user
export const updateBook = createAsyncThunk('api/book/update', async (formData: any, thunkAPI) => {
  try {
    return await bookService.update(formData)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getBook.fulfilled, (state, action: PayloadAction) => {
      state.books = action.payload
    })
  },
})

export const {reset} = bookSlice.actions
export default bookSlice.reducer
