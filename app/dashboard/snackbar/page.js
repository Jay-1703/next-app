import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function Snackbars({ handleCloseSnackbar, openSnackbar, openSnackbarType }) {
    if (openSnackbarType === "Add employee") {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                    <Alert sx={{ width: '100%' }}>
                        New Employee is added successfully.
                    </Alert>
                </Snackbar>
            </Stack>
        );
    }
    else if (openSnackbarType === "Delete employee") {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                    <Alert sx={{ width: '100%' }}>
                        Employee is deleted successfully.
                    </Alert>
                </Snackbar>
            </Stack>
        );
    }
    else if (openSnackbarType === "Update employee") {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                    <Alert sx={{ width: '100%' }}>
                        Employee is updated successfully.
                    </Alert>
                </Snackbar>
            </Stack>
        );
    }
}
