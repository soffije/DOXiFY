import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import chatReducer from '../features/chat/chatSlice'
import profileReducer from '../features/chat/profileSlice'
import friendsReducer from '../features/chat/friendsSlice'
import requestsReducer from '../features/chat/requestsSlice'
import pendingsReducer from '../features/chat/pendingsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    chat: chatReducer,
    friends: friendsReducer,
    requests: requestsReducer,
    pendings: pendingsReducer,
  },
})
