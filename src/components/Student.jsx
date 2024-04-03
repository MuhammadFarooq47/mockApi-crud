import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { fetchStudents, deleteStudent } from '../redux/slices/studentSlices'; // Adjust the import path as necessary

function Students() {
 const dispatch = useDispatch();
 const students = useSelector((state) => state.students.students);
 const status = useSelector((state) => state.students.status);
 const error = useSelector((state) => state.students.error);

 useEffect(() => {
    dispatch(fetchStudents());
 }, [dispatch]);

 const headers = [
    { label: "id", key: "id" },
    { label: "Name", key: "Name" },
    { label: "Class", key: "Class" },
    { label: "Section", key: "Section" }
 ];

 const handleDelete = (id) => {
    dispatch(deleteStudent(id));
 };

 return (
    <>
      <div className='flex justify-around'>
        <h1>Students</h1>
        <Link to={`/add`} className='bg-[#4180FE] rounded-md px-3 py-1 text-white'>Add Students</Link>
        {students?.length > 0 && 
          <CSVLink className='bg-green-400 text-white rounded-md px-3 py-1' data={students} headers={headers}>
            Download CSV
          </CSVLink>
        }
      </div>
      <div className='border-gray-lite border rounded-md mt-4 overflow-auto h-72 no-scrollbar text-white'>
        <table className="table-auto divide-y divide-gray-lite w-full whitespace-nowrap">
          <thead className='sticky top-0 bg-[#1e1e1e]'>
            <tr className='h-12'>
              <th className=''>ID</th>
              <th className=''>Name</th>
              <th className=''>Class</th>
              <th className=''>Section</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody className='text-center divide-y divide-gray-lite whitespace-nowrap text-black'>
            {students?.map((stud, idx) => (
              <tr key={idx + 1}>
                <td>{stud?.id}</td>
                <td>{stud?.Name}</td>
                <td>{stud?.Class}</td>
                <td>{stud?.Section}</td>
                <td>
                 <Link to={`/edit`} state={{ id: stud?.id, data: stud }} className='bg-[#4180FE] rounded-md px-3 py-1'>Edit</Link>
                 <button className='bg-[#CE0000] rounded-md px-3 py-1' onClick={() => handleDelete(stud?.id)}>Delete</button> 
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </>
 );
}

export default Students;
