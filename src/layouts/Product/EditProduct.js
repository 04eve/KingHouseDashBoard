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
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { AuthContext } from "context/Auth";

function EditCategory() {
    
    const { token } = useContext(AuthContext);
    console.log("token",token)
    
    const [Products, setProducts]= useState({
        productName:'',
        description:'',
        categoryId:'',
        productQty:'',
        price:'',
        image:'',
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editCategory = async (event) => {
        event.preventDefault()
        // let CategoryData = new FormData(event.target)
        const edit = await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await edit.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/product')
        }
    }

    useEffect(() => {
        async function getCategory() {
            const CategoryData = await fetch(`http://localhost:3000/categories`)
            const json = await CategoryData.json()
            setCategory(json.data)
        }
        getCategory();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editCategory}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Category</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={category?.categoryName} onChange={(e) => { setCategory({ ...category, categoryName: e.target.value }) }} categoryName="categoryName" fullWidth label="categoryName" />
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <input type={'file'} value={category?.image} onChange={(e) => { setCategory({ ...category, image: e.target.value }) }} image="image" fullWidth label="image" />
                                    </MDBox>

                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit categories
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

export default EditCategory