import { Routes, Route } from 'react-router-dom';
import Student from '../components/Student';


export default function Layout() {
  return (
    <Routes>
        <Route path='students' element={<Student />} />
      </Routes>
  )
}
