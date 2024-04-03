// studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';



// Async action for fetching students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
 const response = await axios.get('http://localhost:8000/Students');
 return response.data;
});

// Async action for adding a student
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
 const response = await axios.post('http://localhost:8000/Students', student);
 return response.data;
});

// Async action for updating a student
export const updateStudent = createAsyncThunk('students/updateStudent', async (data) => {
    console.log("🚀 ~ updateStudent ~ id:", data)
    let id = data?.id;
    let userData = {
        Name: data?.Name,
        Class: data?.Class,
        Section: data?.Section
    }
 const response = await axios.patch(`http://localhost:8000/Students/${id}`, userData);
 return response.data;
});

// Async action for deleting a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
 await axios.delete(`http://localhost:8000/Students/${id}`);
 return id;
});

// Slice
const studentsSlice = createSlice({
 name: 'students',
 initialState: { 
    students: [], 
    status: 'idle', 
    error: null 
},
 reducers: {},
 extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action.payload)
        console.log(current(state));
        const index = state.students.findIndex((student) => student.id === action.payload.id);
        if (index !== -1) {
           // Use Immer's draft state to update the student object
           state.students[index] = action.payload;
        }
       })
       
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((student) => student.id !== action.payload);
      });
 },
});

export default studentsSlice.reducer;
