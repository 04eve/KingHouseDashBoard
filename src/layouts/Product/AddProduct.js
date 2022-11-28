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
import { useRef, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

function AddProduct() {
    const{token}= useContext(AuthContext)
    const handleOnChange = (e) => {
        Products[e.target.name] = Products[e.target.value]
    }
    const [Products, setProducts]= useState({
        productName:'',
        description:'',
        categoryId:'',
        productQty:'',
        price:'',
        // files:'',
    })
    // const [ProductPhoto, setProductPhoto]= useState({
    //     productId: Products.id,
    //     file: photo.file,
        
    // })
    const navigate = useNavigate()
    const addProducts = async (event) => {
        let GalleryDate = new FormData(event.target);
        event.preventDefault()
        console.log(Products) 
        const added = await fetch(`http://localhost:3000/products`, {
            method: 'POST',
            body: GalleryDate,
            headers: {
                // "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`, 
            },
  
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/product')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={addProducts}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Products</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="productName" fullWidth label="productName" value={Products.productName} onChange={(e) => setProducts({...Products, productName: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="description" fullWidth label="description" value={Products.description} onChange={(e) => setProducts({...Products, description: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="categoryId" fullWidth label="categoryId" value={Products.categoryId} onChange={(e) => setProducts({...Products, categoryId: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="productQty" fullWidth label="productQty" value={Products.productQty} onChange={(e) => setProducts({...Products, productQty: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="price" fullWidth label="price" value={Products.price} onChange={(e) => setProducts({...Products, price: e.target.value})}/></MDBox>
                                    <MDBox>
                                    <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>file</Icon></Grid>
                                                    <Grid item>Upload file</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='file' hidden accept="file/*" multiple type="file" />
                                        </Button>
                                    </MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Product
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

export default AddProduct
