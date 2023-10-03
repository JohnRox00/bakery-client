import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Layout from "../../components/layouts/Layout";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TotalSalesChart from "../../components/admin/TotalSalesChart";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [monthlyAllBranchSales, setMonthlyAllBranchSales] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllBranchSales();
    fetchAllUsers();
  }, []);

  const fetchAllBranchSales = async () => {
    let url = "/api/v1/sales/branches";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setMonthlyAllBranchSales(data);
    } catch (err) {
      console.log(err.error.message || err.message);
    }
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
      console.log(err.error.message || err.message);
    }
  };

  useEffect(() => {
    fetchAllSalesByBranch();
  }, []);

  const fetchAllSalesByBranch = async () => {
    let url = "/api/v1/sales/group";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setDailySales(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Layout title={"Admin - Dashboard"}>
        <Stack direction={"row"} spacing={2}>
          <AdminSidebar users={users} />
          <Box flex={4} p={2}>
            <Typography variant="h6">Daily Sales</Typography>
            <Grid container>
              {users.map(
                (user) =>
                  user.role === 0 && (
                    <Grid item xs={6} s={4} md={3} lg={2} key={user._id}>
                      <Card sx={{ maxWidth: 200, margin: 1, height: 100 }}>
                        <CardContent>
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            {user.branch_name}
                          </Typography>
                          {dailySales.map(
                            (sale) =>
                              sale._id === user._id && (
                                <Grid
                                  container
                                  justifyContent="flex-end"
                                  key={sale._id}
                                >
                                  <Grid item>
                                    <Typography
                                      sx={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                      }}
                                      variant="h6"
                                      color="text.secondary"
                                      gutterBottom
                                    >
                                      {sale.totalSales ? sale.totalSales : 0}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              )
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  )
              )}
            </Grid>
            <Typography sx={{ mt: 2 }} variant="h6">
              Monthly Sales
            </Typography>
            <TotalSalesChart dataSales={monthlyAllBranchSales} />
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default AdminDashboard;
