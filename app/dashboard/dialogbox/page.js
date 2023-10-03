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
import { Grid, OutlinedInput } from '@mui/material';

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
    setLoading(false);
    handleClose();
    setOpenSnackbarType('Add employee');
    handleClickSnackbar();
    getEmployees();
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
    setLoading(false);
    getEmployees();
    handleClose();
    setOpenSnackbarType('Update employee');
    handleClickSnackbar();
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
            <div className='flex my-4  justify-end'>
              <button onClick={handleGeneratePDF} type="button" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center bg-blue-600 text-white rounded sm:w-auto">
                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                Generate PDF
              </button>
            </div>
            <DialogContentText id="alert-dialog-description">
              <DialogTitle id="alert-dialog-title" className='text-center'>
                {"Empoloyee List"}
              </DialogTitle>
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
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {
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
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContentText>
            <div className='flex justify-end my-10'>
              <Button onClick={handleClose} variant='outlined' className='w-32' color='info'>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}