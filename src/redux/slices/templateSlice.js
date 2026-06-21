import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // id of the currently selected template (matches the template registry keys)
  selectedTemplate: null,
}

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    selectTemplate: (state, action) => {
      state.selectedTemplate = action.payload
    },
    clearTemplate: (state) => {
      state.selectedTemplate = null
    },
  },
})

export const { selectTemplate, clearTemplate } = templateSlice.actions

export default templateSlice.reducer
