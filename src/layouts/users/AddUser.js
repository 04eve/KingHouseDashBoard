import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";


import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const handleOnChange = (e) => {
        user[e.target.name] = user[e.target.value]
    }
    const [user, setUser]= useState({
        name:'',
        email:'',
        password:'',
        phone:''
    })
    const navigate = useNavigate()
    const addUser = async (event) => {
        event.preventDefault()
        console.log(user)        
        const added = await fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify(user)
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/users')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={addUser}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New User</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="name" fullWidth label="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="email" fullWidth label="Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="password" fullWidth label="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="phone" fullWidth value={user.phone} label="phone" onChange={(e) => setUser({...user, phone: e.target.value})} /></MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New User
                                            </MDTypography>
                                        </Button>
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

export default AddUser