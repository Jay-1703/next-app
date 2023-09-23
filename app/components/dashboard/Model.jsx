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

export default function Model({ open, handleClose, modelType, getEmployees, showOneEmployee, id }) {
  const showEmployeeData = showOneEmployee;
  
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [city, setCity] = React.useState();
  const [number, setNumber] = React.useState();
  
  const [loading, setLoading] = React.useState(false);

  
  const deleteEmployee = async () => {
    const res = await fetch(`/api/dashboard/deleteemployee/${id}`, {
      method: "DELETE",
    });
    handleClose();
    getEmployees();
  }

  const addEmployee = async () => {
    setLoading(true);
    const res = await fetch('/api/dashboard/addemployee', {
      method: 'POST',
      body: JSON.stringify({ 'name': name, 'email': email, 'city': city, 'number': number }),
    });
    setLoading(false);
    handleClose();
    getEmployees();
  }

  const updateEmployee = async () => {
    const res = await fetch('/api/dashboard/updateemployee', {
      method: 'PUT',
      body: JSON.stringify({ 'id': showEmployeeData[0].id, 'name': name, 'email': email, 'city': city, 'number': number })
    })
    console.log(res);
  }

  if (modelType === "Add employee") {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
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
                <button disabled={loading} onClick={addEmployee} type='button' className='py-3 px-4 my-3 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white bg-purple-500 text-sm '>
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
          <DialogTitle id="alert-dialog-title">
            {"Show empoloyee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form className='px-8'>
                {showEmployeeData?.map((data) => {
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
    useEffect(() => {
      setName(showOneEmployee[0].employee_name);
      setEmail(showOneEmployee[0].email);
      setCity(showOneEmployee[0].city);
      setNumber(showOneEmployee[0].number);
    }, []);
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
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
                      onChange={(e) => { setEmployeeName(e.target.value) }}
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setEmail(e.target.value) }}
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setCity(e.target.value) }}
                      value={city}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OutlinedInput
                      className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                      fullWidth
                      onChange={(e) => { setNumber(e.target.value) }}
                      value={number}
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
