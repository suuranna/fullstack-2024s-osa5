import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { text: null, type: 'error' },
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message) => {
  return dispatch => {
    dispatch(setMessage({ text: message.text, type: message.type }))
    setTimeout(() => {
      dispatch(setMessage({ text: null, type: 'error' }))
    }, 5000)
  }
}

export default notificationSlice.reducer