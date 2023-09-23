import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from './Loader';

export default function Employeeslist({loading,employees,handleClickOpen,getEmployees,setModelType,setShowOneEmployee,setId}) {

  const deleteEmployee = async (id) => {
    setModelType("Delete employee");
    handleClickOpen();
    setId(id);
  }

  const updateEmployee = async (id) =>{
    setModelType("Update employee");
    const res = await fetch(`/api/dashboard/showemployee/${id}`,{
      method: "GET",
    });
    const data = await res.json();
    if (data.length >= 0) {
      setShowOneEmployee(data);
    }
    handleClickOpen();
  }

  const showEmployee = async (id) =>{
    setModelType("Show employee");
    const res = await fetch(`/api/dashboard/showemployee/${id}`,{
      method: "GET",
    });
    const data = await res.json();
    if (data.length >= 0) {
      setShowOneEmployee(data);
    }
    handleClickOpen();
  }

  return (
    <TableContainer component={Paper}>
      {loading?<Loader></Loader>:null}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='font-bold'>Employee name</TableCell>
            <TableCell className='font-bold'>Email</TableCell>
            <TableCell className='font-bold'>City</TableCell>
            <TableCell className='font-bold'>Number</TableCell>
            <TableCell className='font-bold text-center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow key={row.id} className='hover:bg-gray-100 hover:cursor-pointer'>
              <TableCell component="th" scope="row">{row.employee_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell className='text-center'>
                <IconButton onClick={()=>{deleteEmployee(row.id)}} aria-label="delete" size='small' className='bg-rose-100 text-red-600 hover:bg-rose-100 mx-1'>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={()=>{updateEmployee(row.id)}} aria-label="edit" size='small' className='bg-green-200 text-green-600 hover:bg-green-200 mx-1'>
                  <ModeEditOutlineIcon />
                </IconButton>
                <IconButton onClick={()=>{showEmployee(row.id)}} aria-label="show" size='small' className='bg-yellow-200 text-yellow-500 hover:bg-yellow-200 mx-1'>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
