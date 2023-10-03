import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Layout from "../components/layouts/Layout";

const PageNotFound = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Layout title={"Go back - Page Not Found"}>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "100px",
            fontWeight: 700,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "normal",
          }}
        >
          Oops ! Page Not Found
        </Typography>
        {!userInfo ? (
          <Link to="/">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Go Back
            </Button>
          </Link>
        ) : userInfo.role === 1 ? (
          <Link to="/admin/dashboard">
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
              Go Back
            </Button>
          </Link>
        ) : (
          <Link to="/users/dashboard">
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
              Go Back
            </Button>
          </Link>
        )}
      </Box>
    </Layout>
  );
};

export default PageNotFound;
