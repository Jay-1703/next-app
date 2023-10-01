import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, OutlinedInput } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

export default function Model({ open, handleClose, modelType, getEmployees, showOneEmployee, id, updateEmployeeData , handleClickSnackbar,setOpenSnackbarType}) {

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

  
}