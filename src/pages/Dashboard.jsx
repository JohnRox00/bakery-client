import { Box, Stack, Typography } from "@mui/material";
import Layout from "../components/layouts/Layout";
import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/layouts/Navbar";
import UserDailySaleChart from "../components/layouts/UsersDailySalesChart";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dailySales, setDailySales] = useState([]);

  useEffect(() => {
    fetchDailySaleByUser();
  }, []);
  const fetchDailySaleByUser = async () => {
    let url = "/api/v1/sales/user";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setDailySales(data);
      console.log(data);
    } catch (err) {
      console.log(err?.error?.message || err?.message);
    }
  };
  return (
    <>
      <Navbar />
      <Layout title={"Dashboard - Bakery Management App"}>
        <Stack direction={"row"} spacing={2}>
          <Sidebar />
          <Box flex={4} p={2}>
            <Typography variant="h6">Daily Sales</Typography>
            <UserDailySaleChart dataSales={dailySales} />
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default Dashboard;
