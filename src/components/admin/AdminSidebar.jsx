/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearCredential } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const AdminSidebar = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    let url = "/api/v1/auth/logout";
    let requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.ok) {
        dispatch(clearCredential());
        navigate("/");
      }
    } catch (err) {
      console.log(err?.error?.message);
    }
  };

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: {
          sx: "none",
          sm: "block",
        },
        borderRight: "1px solid rgba(0, 0, 0, .1)",
        boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.2)",
        minHeight: "93vh",
        maxWidth: 300,
      }}
      component={Paper}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/total-sales")}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Total Sales and Branches" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;
