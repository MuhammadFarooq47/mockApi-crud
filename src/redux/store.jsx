// store.js
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentSlices';

const store = configureStore({
 reducer: {
    students: studentsReducer,
 },
});

export default store;
