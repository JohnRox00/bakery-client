import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ArticleIcon from "@mui/icons-material/Article";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredential } from "../../slices/authSlice";
import { clearCart } from "../../slices/cartSlice";

const Sidebar = () => {
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
        dispatch(clearCart());
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
          <ListItemButton onClick={() => navigate("/users/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/users/pos")}>
            <ListItemIcon>
              <PointOfSaleIcon />
            </ListItemIcon>
            <ListItemText primary="POS" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/users/products")}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Products List" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/users/sales-report")}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Total Sales" />
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

export default Sidebar;
