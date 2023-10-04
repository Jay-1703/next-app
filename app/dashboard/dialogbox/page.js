import * as React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, OutlinedInput } from '@mui/material';

export default function Model({ open, handleClose, modelType, getEmployees, showOneEmployee, id, updateEmployeeData, handleClickSnackbar, setOpenSnackbarType, employees }) {

  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [number, setNumber] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  //--------------- Delete employee --------------
  const deleteEmployee = async () => {
    const res = await axios.delete(`/api/dashboard/deleteemployee/${id}`);
    handleClose();
    getEmployees();
    setOpenSnackbarType('Delete employee');
    handleClickSnackbar();
  }

  //--------------- Add employee --------------
  const addEmployee = async () => {
    setLoading(true);
    const res = await axios({
      method: 'POST',
      url: '/api/dashboard/addemployee',
      data: JSON.stringify({ 'name': name, 'email': email, 'city': city, 'number': number }),
    });
    handleClose();
    setOpenSnackbarType('Add employee');
    handleClickSnackbar();
    getEmployees();
    setLoading(false);
  }

  //--------------- Update employee --------------
  const updateEmployee = async () => {
    setLoading(true);
    const requestBody = {
      'id': updateEmployeeData[0].id,
      'name': name ? name : updateEmployeeData[0].employee_name,
      'email': email ? email : updateEmployeeData[0].email,
      'city': city ? city : updateEmployeeData[0].city,
      'number': number ? number : updateEmployeeData[0].number
    };
    const res = await axios({
      url: '/api/dashboard/updateemployee',
      method: 'PUT',
      data: JSON.stringify(requestBody)
    })
    getEmployees();
    handleClose();
    setOpenSnackbarType('Update employee');
    handleClickSnackbar();
    setLoading(false);
  }

  //--------------- Generate PDF --------------
  const handleGeneratePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    // Reference to the HTML element containing the content you want to convert to PDF
    const contentElement = document.getElementById('alert-dialog-description');
    // Use html2canvas to capture the content as an image
    const canvas = await html2canvas(contentElement);
    // Convert the captured image to a data URL
    const imageData = canvas.toDataURL('image/png');
    // Add the captured image to the PDF
    pdf.addImage(imageData, 'PNG', 10, 10, 180, 0); // Adjust the dimensions as needed
    // Save the PDF
    pdf.save('employees list');
  };

  //--------------- Generate CSV --------------
  const tableToCsv = (table) => {
    const rows = table.querySelectorAll('tr');
    const csvArray = [];
    for (const row of rows) {
      const cols = row.querySelectorAll('td, th');
      const rowArray = Array.from(cols, cell => cell.textContent);
      csvArray.push(rowArray.join(','));
    }
    return csvArray.join('\n');
  };

  //--------------- Generate CSV-to-EXCEL --------------
  const handleExportToExcel = () => {
    const table = document.getElementById('alert-dialog-description');  // Replace with your actual table ID
    const csvContent = tableToCsv(table);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employee list.csv';
    link.click();
  };

  if (modelType === "Add employee") {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className='text-center'>
            {"Add empoloyee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form className='px-8'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <OutlinedInput
                      onChange={(e) => { setName(e.target.value) }}
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      placeholder='Employee Username'
                      type='name'
                      name='name'
                      id='name'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      onChange={(e) => { setEmail(e.target.value) }}
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      placeholder='Employee Email'
                      type='email'
                      name='email'
                      id='email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      onChange={(e) => { setCity(e.target.value) }}
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      type='text'
                      placeholder='Employee City'
                      name='city'
                      id='city'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      onChange={(e) => { setNumber(e.target.value) }}
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      type='number'
                      name='number'
                      id='number'
                      placeholder='Employee Phone Number'
                    />
                  </Grid>
                </Grid>
                <button disabled={loading} onClick={addEmployee} type='button' className='w-full my-3 inline-flex items-center justify-center py-[6px] px-[8px] text-center text-sm font-medium transition-all border rounded-md bg-blue-600 text-white sm:py-2.5 sm:px-2 sm:text-base'>
                  {loading ? <span>Loading....</span> : <span>Add empoloyee</span>}
                </button>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  else if (modelType === "Show employee") {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className='text-center'>
            {"Show empoloyee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form className='px-8'>
                {showOneEmployee?.map((data) => {
                  return (
                    <Grid container spacing={2} key={data.id}>
                      <Grid item xs={12}>
                        <OutlinedInput
                          className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                          fullWidth
                          disabled
                          defaultValue={data.employee_name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <OutlinedInput
                          className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                          fullWidth
                          disabled
                          defaultValue={data.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <OutlinedInput
                          className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                          fullWidth
                          disabled
                          defaultValue={data.city}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <OutlinedInput
                          className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                          fullWidth
                          disabled
                          defaultValue={data.number}
                        />
                      </Grid>
                    </Grid>
                  )
                })}
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  else if (modelType === "Delete employee") {
    return (
      <div>
        <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Delete employee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete this employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' color='info'>Cancel</Button>
            <Button onClick={deleteEmployee} variant="outlined" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  else if (modelType === "Update employee") {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className='text-center'>
            {"Update empoloyee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form className='px-8'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setName(e.target.value) }}
                      defaultValue={updateEmployeeData[0]?.employee_name}
                      name='name'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setEmail(e.target.value) }}
                      defaultValue={updateEmployeeData[0]?.email}
                      name='email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setCity(e.target.value) }}
                      defaultValue={updateEmployeeData[0]?.city}
                      name='city'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setNumber(e.target.value) }}
                      defaultValue={updateEmployeeData[0]?.number}
                      name='number'
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} variant='outlined' color='info'>Cancel</Button>
                  <Button onClick={updateEmployee} variant="outlined" color='success'>
                    Update
                  </Button>
                </DialogActions>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  else if (modelType === "PDF") {
    return (
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            <Box className='flex justify-end'>
              <Box className='my-4 mx-1'>
                <button onClick={handleGeneratePDF} type="button" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center bg-red-600 text-white rounded sm:w-auto">
                  <svg fill="#f7f7f7" className="w-5 h-5 mr-2 -ml-1" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.14 482.14" xmlSpace="preserve" stroke="#f7f7f7"> <g id="SVGRepo_bgCarrier" strokeWidth={0} /> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /> <g id="SVGRepo_iconCarrier">   {" "}   <g>     {" "}     <path d="M142.024,310.194c0-8.007-5.556-12.782-15.359-12.782c-4.003,0-6.714,0.395-8.132,0.773v25.69 c1.679,0.378,3.743,0.504,6.588,0.504C135.57,324.379,142.024,319.1,142.024,310.194z" />{" "}     <path d="M202.709,297.681c-4.39,0-7.227,0.379-8.905,0.772v56.896c1.679,0.394,4.39,0.394,6.841,0.394 c17.809,0.126,29.424-9.677,29.424-30.449C230.195,307.231,219.611,297.681,202.709,297.681z" />{" "}     <path d="M315.458,0H121.811c-28.29,0-51.315,23.041-51.315,51.315v189.754h-5.012c-11.418,0-20.678,9.251-20.678,20.679v125.404 c0,11.427,9.259,20.677,20.678,20.677h5.012v22.995c0,28.305,23.025,51.315,51.315,51.315h264.223 c28.272,0,51.3-23.011,51.3-51.315V121.449L315.458,0z M99.053,284.379c6.06-1.024,14.578-1.796,26.579-1.796 c12.128,0,20.772,2.315,26.58,6.965c5.548,4.382,9.292,11.615,9.292,20.127c0,8.51-2.837,15.745-7.999,20.646 c-6.714,6.32-16.643,9.157-28.258,9.157c-2.585,0-4.902-0.128-6.714-0.379v31.096H99.053V284.379z M386.034,450.713H121.811 c-10.954,0-19.874-8.92-19.874-19.889v-22.995h246.31c11.42,0,20.679-9.25,20.679-20.677V261.748 c0-11.428-9.259-20.679-20.679-20.679h-246.31V51.315c0-10.938,8.921-19.858,19.874-19.858l181.89-0.19v67.233 c0,19.638,15.934,35.587,35.587,35.587l65.862-0.189l0.741,296.925C405.891,441.793,396.987,450.713,386.034,450.713z M174.065,369.801v-85.422c7.225-1.15,16.642-1.796,26.58-1.796c16.516,0,27.226,2.963,35.618,9.282 c9.031,6.714,14.704,17.416,14.704,32.781c0,16.643-6.06,28.133-14.453,35.224c-9.157,7.612-23.096,11.222-40.125,11.222 C186.191,371.092,178.966,370.446,174.065,369.801z M314.892,319.226v15.996h-31.23v34.973h-19.74v-86.966h53.16v16.122h-33.42 v19.875H314.892z" />{" "}   </g>{" "} </g></svg>
                  Generate PDF
                </button>
              </Box>
              <Box className='my-4 mx-1'>
                <button onClick={handleExportToExcel} type="button" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center bg-green-600 text-white rounded sm:w-auto">
                  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" xmlSpace="preserve"> <g id="SVGRepo_bgCarrier" strokeWidth={0} /> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /> <g id="SVGRepo_iconCarrier"> {" "} <g>   {" "}   <path d="M25.162,3H16v2.984h3.031v2.031H16V10h3v2h-3v2h3v2h-3v2h3v2h-3v3h9.162 C25.623,23,26,22.609,26,22.13V3.87C26,3.391,25.623,3,25.162,3z M24,20h-4v-2h4V20z M24,16h-4v-2h4V16z M24,12h-4v-2h4V12z M24,8 h-4V6h4V8z" />{" "}   <path d="M0,2.889v20.223L15,26V0L0,2.889z M9.488,18.08l-1.745-3.299c-0.066-0.123-0.134-0.349-0.205-0.678 H7.511C7.478,14.258,7.4,14.494,7.277,14.81l-1.751,3.27H2.807l3.228-5.064L3.082,7.951h2.776l1.448,3.037 c0.113,0.24,0.214,0.525,0.304,0.854h0.028c0.057-0.198,0.163-0.492,0.318-0.883l1.61-3.009h2.542l-3.037,5.022l3.122,5.107 L9.488,18.08L9.488,18.08z" />{" "} </g>{" "} </g></svg>
                  Generate Excel
                </button>
              </Box>
            </Box>
            <DialogContentText id="alert-dialog-description">
              <DialogTitle id="alert-dialog-title" className='text-center font-bold text-black md:text-2xl mb-3'>
                {"Empoloyee List"}
              </DialogTitle>
              <Box className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow border-2 border-gray-300">
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
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {
                            employees.map((row) => (
                              <tr key={row.id}>
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
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Box>
            </DialogContentText>
            <Box className='flex justify-end my-10'>
              <Button onClick={handleClose} variant='outlined' className='w-32' color='info'>Close</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}