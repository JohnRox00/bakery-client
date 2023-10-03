import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AdminNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          backgroundColor: "darkgray",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bakery Management System
        </Typography>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography variant="h6">{userInfo.branch_name}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
