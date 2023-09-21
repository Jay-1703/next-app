'use client';
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, OutlinedInput } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { signIn, signOut, getProviders } from 'next-auth/react'

export default function CreateRegister() {

    const [Loading, setLoading] = React.useState(false);
    const [providers, setProviders] = React.useState([]);

    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const init = async () => {
        const setUpProviders = await getProviders();
        setProviders(setUpProviders);

        console.log(providers);
    }
    React.useEffect(() => { init() }, [])


    const SignUp = async () => {
        console.log(name, email, password);
        const data = { name, email, password };
        try {
            const signInResponse = await signIn("credentials", {
                name,
                email,
                password,
                redirect: false,
            });
            console.log(signInResponse);
        } catch (error) {
            console.log(error);
        }
        // try {
        //     const res = await axios.post('/api/auth/register',data);
        //     console.log(res);    
        // } catch (error) {
        //     console.log(error);
        // }
    }
    return (
        <Container component="main" maxWidth="xs" className='border rounded-xl text-center my-20'>
            <CssBaseline />
            <Box className='py-10'>
                <Typography className='font-bold text-2xl font-sans'>
                    Sign up
                </Typography>
                <form noValidate onSubmit={SignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <button className='my-3 p-3 inline-flex items-center rounded-lg font-sans text-sm w-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'>
                                <svg className="w-4 h-4 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                </svg>
                                Signup with Google
                            </button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <button className='my-3 p-3 inline-flex items-center rounded-lg font-sans text-sm w-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'>
                                <svg className="w-4 h-4 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                                </svg>
                                Signup with Github
                            </button>
                        </Grid>
                        <Grid item xs={12}>
                            <p className='text-sm text-center font-sans'>Or</p>
                        </Grid>
                        <Grid item xs={12}>
                            <OutlinedInput
                                onChange={(e) => { setName(e.target.value) }}
                                className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                                fullWidth
                                placeholder='Enter Username'
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
                                placeholder='Enter Email'
                                type='email'
                                name='email'
                                id='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OutlinedInput
                                onChange={(e) => { setPassword(e.target.value) }}
                                className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                                fullWidth
                                type='password'
                                placeholder='Enter Password'
                                name='password'
                                id='password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OutlinedInput
                                className='h-10 placeholder-gray-600 font-semibold font-sans rounded-lg'
                                fullWidth
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Enter Conformpassword'
                            />
                        </Grid>
                    </Grid>
                    <button disabled={Loading} onClick={SignUp} type='button' className='py-3 px-4 my-3 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white bg-purple-500 text-sm '>
                        {Loading ? <span>Loading...</span> : <span>SignUp</span>}
                    </button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="http://localhost:3000/Login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}