import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

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

export default Navbar;
