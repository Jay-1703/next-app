'use client';
import * as React from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../../loading';
import Model from '../dialogbox/page';
import { Button, Grid } from '@mui/material';
import Snackbar from '../snackbar/page';
import Snackbars from '../snackbar/page';

export default function Userslist() {
  const [loading, setLoading] = React.useState();
  const [employees, setEmployees] = React.useState([]);
  const [modelType, setModelType] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [showOneEmployee, setShowOneEmployee] = React.useState([]);
  const [updateEmployeeData, setUpdateEmployeeData] = React.useState([]);
  const [search, setSearch] = React.useState();
  const [searchdata, setSearchData] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openSnackbarType, setOpenSnackbarType] = React.useState(null);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  //--------------- Model open --------------
  const handleClickOpen = () => {
    setOpen(true);
  };

  //--------------- Model close --------------
  const handleClose = () => {
    setOpen(false);
    setModelType(null);
  };

  //--------------- Fetch all employees --------------
  const getEmployees = async () => {
    setLoading(true);
    const res = await axios.get('/api/dashboard');
    const data = await res.data;
    setEmployees(data);
    setLoading(false);
  }

  React.useEffect(() => {
    getEmployees();
  }, [])

  //--------------- Open model for Add employee --------------
  const addEmployee = () => {
    setModelType("Add employee");
    handleClickOpen();
  }

  //--------------- Open model for Delete employee --------------
  const deleteEmployee = async (id) => {
    setModelType("Delete employee");
    handleClickOpen();
    setId(id);
  }

  //--------------- Open model for Update employee --------------
  const updateEmployee = async (id) => {
    setModelType("Update employee");
    const res = await axios.get(`/api/dashboard/showemployee/${id}`);
    const data = await res.data;
    if (data.length >= 0) {
      setUpdateEmployeeData(data);
    }
    handleClickOpen();
  }

  //--------------- Show one employee --------------
  const showEmployee = async (id) => {
    setModelType("Show employee");
    const res = await axios.get(`/api/dashboard/showemployee/${id}`);
    const data = await res.data;
    if (data.length >= 0) {
      setShowOneEmployee(data);
    }
    handleClickOpen();
  }

  //--------------- Show one employee --------------
  const searchEmployee = async (searchString) => {
    try {
      const res = await axios({
        method: "POST",
        url: `/api/dashboard/searchemployee`,
        data: JSON.stringify({ search: searchString }),
      });
      setSearchData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="w-full mb-1">
          <div className="flex">
            <div className="items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0">
              <div className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <div className="relative flex items-center w-full h-12 rounded bg-white overflow-hidden border">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input onChange={(e) => { searchEmployee(e.target.value) }} className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search" placeholder="Search by username..." />
                  </div>
                </div>
              </div>

            </div>
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button onClick={addEmployee} type="button" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center bg-blue-600 text-white rounded sm:w-auto">
                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add employee
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loader></Loader> : null}

      {/* --------------- Display employees data -------------- */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4 text-sm font-semibold text-left text-gray-900 uppercase">
                      Name
                    </th>
                    <th scope="col" className="p-4 text-sm font-semibold text-left text-gray-900 uppercase">
                      Email
                    </th>
                    <th scope="col" className="p-4 text-sm font-semibold text-left text-gray-900 uppercase">
                      Number
                    </th>
                    <th scope="col" className="p-4 text-sm font-semibold text-left text-gray-900 uppercase">
                      City
                    </th>
                    <th scope="col" className="p-4 text-sm font-semibold text-left text-gray-900 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    searchdata.length > 0 ? searchdata.map((row) => (
                      <tr className="hover:bg-gray-100" key={row.id}>
                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-600">
                            {row.employee_name}
                          </div>
                        </td>
                        <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">
                          <div className="text-base font-medium text-gray-600">
                            {row.email}
                          </div>
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-600">
                            {row.number}
                          </div>
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-600">
                            {row.city}
                          </div>
                        </td>
                        <td className="p-4 space-x-2 whitespace-nowrap">
                          <IconButton onClick={() => { deleteEmployee(row.id) }} aria-label="delete" size='small' className='bg-rose-100 text-red-600 hover:bg-rose-100 mx-1'>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => { updateEmployee(row.id) }} aria-label="edit" size='small' className='bg-green-200 text-green-600 hover:bg-green-200 mx-1'>
                            <ModeEditOutlineIcon />
                          </IconButton>
                          <IconButton onClick={() => { showEmployee(row.id) }} aria-label="show" size='small' className='bg-yellow-200 text-yellow-500 hover:bg-yellow-200 mx-1'>
                            <VisibilityIcon />
                          </IconButton>
                        </td>
                      </tr>
                    )) :
                      employees.map((row) => (
                        <tr className="hover:bg-gray-100" key={row.id}>
                          <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                            <div className="text-base font-medium text-gray-600">
                              {row.employee_name}
                            </div>
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">
                            <div className="text-base font-medium text-gray-600">
                              {row.email}
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                            <div className="text-base font-medium text-gray-600">
                              {row.number}
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                            <div className="text-base font-medium text-gray-600">
                              {row.city}
                            </div>
                          </td>

                          <td className="p-4 space-x-2 whitespace-nowrap">
                            <IconButton onClick={() => { deleteEmployee(row.id) }} aria-label="delete" size='small' className='bg-rose-100 text-red-600 hover:bg-rose-100 mx-1'>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => { updateEmployee(row.id) }} aria-label="edit" size='small' className='bg-green-200 text-green-600 hover:bg-green-200 mx-1'>
                              <ModeEditOutlineIcon />
                            </IconButton>
                            <IconButton onClick={() => { showEmployee(row.id) }} aria-label="show" size='small' className='bg-yellow-200 text-yellow-500 hover:bg-yellow-200 mx-1'>
                              <VisibilityIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
      {/* --------------- Model -------------- */}
      <Model open={open} handleClose={handleClose} modelType={modelType} showOneEmployee={showOneEmployee} id={id} getEmployees={getEmployees} updateEmployeeData={updateEmployeeData} handleClickSnackbar={handleClickSnackbar} setOpenSnackbarType={setOpenSnackbarType}/>
      <Snackbars handleCloseSnackbar={handleCloseSnackbar} openSnackbar={openSnackbar} openSnackbarType={openSnackbarType} />
    </div>
  );
}