'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Userslist from './UsersList';
import Model from './Model';

export default function Content() {
  const [modelType , setModelType] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [employees, setEmployees] = React.useState([]);
  const [showOneEmployee, setShowOneEmployee] = React.useState([]);
  const [loading , setLoading] = React.useState(false);

  const getEmployees = async () => {
    setLoading(true);
    const res = await fetch('/api/dashboard', {
      method: 'GET',
    });
    const data = await res.json();
    setEmployees(data);
    setLoading(false);
  }

  React.useEffect(() => {
    getEmployees();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModelType(null);
  };

  const addEmployee = () => {
    setModelType("Add employee");
    handleClickOpen();
  }
  return (
    <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" sx={{ mr: 1 }} onClick={addEmployee}>
                Add user
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Userslist loading={loading} employees={employees} handleClickOpen={handleClickOpen} getEmployees={getEmployees} setModelType={setModelType} setShowOneEmployee={setShowOneEmployee} setId={setId}/>
      <Model open={open} handleClose={handleClose} modelType={modelType} showOneEmployee={showOneEmployee} id={id} getEmployees={getEmployees}/>
    </Paper>
  );
}