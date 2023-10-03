import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import TotalSalesChartForTotalSalePage from "../../components/admin/TotalSalesChartForTotalSalePage";
import { useNavigate } from "react-router-dom";
import AdminModalForm from "../../components/admin/AdminModalForm";

const TotalSales = () => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    fetchAllBranchSales();
    fetchAllUsers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAllUsers = async () => {
    let url = "/api/v1/users";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err?.error?.message || err?.message);
    }
  };

  const fetchAllBranchSales = async () => {
    let url = "/api/v1/sales/branches";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setMonthlySales(data);
    } catch (err) {
      console.log(err.error.message || err.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Stack direction={"row"} spacing={2}>
        <AdminSidebar />
        <Box flex={4} p={2}>
          <Typography sx={{ mt: 2 }} variant="h6">
            Monthly Sales
          </Typography>
          <TotalSalesChartForTotalSalePage dataSales={monthlySales} />
          <Typography sx={{ mt: 3 }} variant="h6">
            List of Branches
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(
                  (user) =>
                    user.role === 0 && (
                      <TableRow
                        key={user._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{user.branch_name}</TableCell>

                        <TableCell align="center">
                          <Button
                            variant="contained"
                            sx={{
                              height: "25px",
                              width: "20px",
                              fontSize: "10px",
                              marginRight: "3px",
                            }}
                            color="primary"
                            component="label"
                            onClick={() => {
                              navigate(
                                `/admin/${user.branch_name
                                  .replace(" ", "-")
                                  .toLowerCase()}`,
                                { state: { id: user._id } }
                              );
                            }}
                          >
                            View
                          </Button>

                          <Button
                            variant="contained"
                            sx={{
                              height: "25px",
                              width: "20px",
                              fontSize: "10px",
                              marginRight: "3px",
                            }}
                            color="success"
                            component="label"
                            onClick={() => {
                              handleOpen();
                              setEditUser({ ...user });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              height: "25px",
                              width: "20px",
                              fontSize: "10px",
                              marginRight: "3px",
                            }}
                            color="warning"
                            component="label"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
            <AdminModalForm
              open={open}
              editUser={editUser}
              handleClose={handleClose}
            />
          </TableContainer>
        </Box>
      </Stack>
    </>
  );
};

export default TotalSales;
