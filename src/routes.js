
import Dashboard from "layouts/dashboard";
import Authors from "layouts/authors";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Users from "layouts/users";
import AddUser from "layouts/users/AddUser";
import Category from "layouts/Categories";
import AddCategory from "layouts/Categories/AddCategory";
import AddProduct from "layouts/Product/AddProduct";
import Product from "layouts/Product"
//react icons
import { RiQuillPenLine } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';





// @mui icons
import Icon from "@mui/material/Icon";
import EditUser from "layouts/users/EditUser";
import EditCategory from "layouts/Categories/EditCategory";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    sidenav: true,
  },
  // {
  //   type: "collapse",
  //   name: "Author",
  //   key: "author",
  //   icon: <RiQuillPenLine />,
  //   route: "/author",
  //   component: <Authors />,
  //   sidenav: false,
  // },
  // {
  //   type: "collapse",
  //   name: "Authors",
  //   key: "author",
  //   icon: <RiQuillPenLine />,
  //   route: "/authors",
  //   component: <Authors />,
  //   sidenav: true,
  // },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <MdPeopleAlt />,
    route: "/users",
    component: <Users />,
    sidenav: true,
  },
  {
    type: "collapse",
    name: "Add User",
    key: "add-user",
    icon: <Icon fontSize="small">forest</Icon>,
    route: "/users/add",
    component: <AddUser />,
    sidenav: false,
  },
  {
    type: "collapse",
    name: "Add product",
    key: "add-product",
    icon:<ChairOutlinedIcon/> ,
    route: "/product/add",
    component: <AddProduct />,
    sidenav:false,
  },
  {
    type: "collapse",
    name: "product",
    key: "product",
    icon:<ChairOutlinedIcon/> ,
    route: "/product",
    component: <Product/>,
    sidenav:true,
  },
  {
    type: "collapse",
    key: "add-user",
    icon: <Icon fontSize="small">forest</Icon>,
    route: "/users/:id",
    component: <EditUser />,
    sidenav: false,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <BiCategoryAlt />,
    route: "/categories",
    component: <Category />,
    sidenav: true,
  },
  {
    type: "collapse",
    name: "Add Category",
    key: "add-Category",
    icon: <Icon fontSize="small">forest</Icon>,
    route: "/categories/add",
    component: <AddCategory />,
    sidenav: false,
  },
  {
    type: "collapse",
    name: "Edit Category",
    key: "edit-Category",
    icon: <Icon fontSize="small">forest</Icon>,
    route: "/categories/:id",
    component: <EditCategory />,
    sidenav: false,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  //   sidenav: true,
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    sidenav: true,
  },

];

export default routes;