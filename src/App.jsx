import './App.css';
import Student from './components/Student';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import EditStudent from './components/EditStudent';


function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path='/'>
        <Route index element={<Student />} />
        <Route path='add' element={<EditStudent />} />
        <Route path='edit' element={<EditStudent />} />
      </Route>
      </Routes>
    </Provider>
  );
}

export default App;
