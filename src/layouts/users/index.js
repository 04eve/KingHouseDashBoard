import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

import { Link } from "react-router-dom";

function Users() {
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "center" },
    // { Header: "password", accessor: "password", align: "center" },
    { Header: "phone", accessor: "phone", align: "center" },
    { Header: "options", accessor: "options", align: "center" },
  ];
  const [rows, setRows] = useState([]);
  const [tableRows, setTableRows] = useState([])
  const { token } = useContext(AuthContext);

  const deleteUsers = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const deleted = await fetch(`http://localhost:3000/admin/${id}`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
      const result = await deleted.json()
      const remainedRows = rows.filter((users) => {
        return users.id !== id
      })
      setRows(remainedRows)
      alert(result.messages.join(' '))
    }

  }
  useEffect(() => {
    const jsxRows = rows?.map((users) => {
      return {
        id: <>{users.id}</>,
        name: <>{users.name}</>,
        email: <>{users.email}</>,
        password: <>{users.password}</>,
        phone: <>{users.phone}</>,
        options: <>
         <MDButton variant="text" color="error" onClick={() => { deleteUsers(users.id) }}>
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
          <Link to={`/users/${users.id}`}>
            <MDButton variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </Link>
        </>
      };
    },[]);
    setTableRows(jsxRows);
  }, [rows])

  useEffect(() => {
    async function getUsers() {
      const data = await fetch(`http://localhost:3000/admin`);
      const userss = await data.json()
      setRows(userss.data)
    }
    getUsers();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                      Users List
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <Link to='/users/add'>
                      <MDButton variant="text" color="white">
                        <Icon>add_circle</Icon>&nbsp;Add
                      </MDButton>
                    </Link>
                  </Grid>
                </Grid>

              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: tableRows
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Users;