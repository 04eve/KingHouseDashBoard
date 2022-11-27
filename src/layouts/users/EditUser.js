import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "context/Auth";

function EditUser() {
    const handleOnChange = (e) => {
        user[e.target.name] = user[e.target.value]
    }
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })
    const { token } = useContext(AuthContext);
    const { id } = useParams()
    const navigate = useNavigate()
    const editUser = async (event) => {
        event.preventDefault()
        const edit = await fetch(`http://localhost:3000/admin/update/${id}`, {
            method: 'PUT',
            body:   JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await edit.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/users')
        }
    }
    // const deletePhoto = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this photo?')) {
    //       const deleted = await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
    //         method: 'DELETE'
    //       })
    //       const result = await deleted.json()
    //       const remainedPhotos = trip.Photos.filter((photo) => {
    //         return photo.id !== id
    //       })
    //       setTrip({...trip, Photos: remainedPhotos})
    //       alert(result.messages.join(' '))
    //     }
    //   }
    useEffect(() => {
        async function getUser() {
            const UserData = await fetch(`${process.env.REACT_APP_API_URL}/users/all`)
            const json = await UserData.json()
            setUser(json.data)
        }
        getUser();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editUser}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit User</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="name" fullWidth label="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="email" fullWidth label="Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="password" fullWidth label="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="phone" fullWidth value={user.passwordConfirmation} label="phone" onChange={(e) => setUser({...user, phone: e.target.value})} /></MDBox>
                                    <MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit Users
                                            </MDTypography>
                                        </Button>
                                    </MDBox>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default EditUser