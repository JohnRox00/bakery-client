import {
  Box,
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
import Layout from "../components/layouts/Layout";
import { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  const handleDate = (date) => {
    let now = new Date(date);
    return now.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    let url = "/api/v1/sales";
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      if (res.ok) {
        setSales(data);
      }
    } catch (err) {
      console.log(err.error.message || err.error);
    }
  };
  return (
    <>
      <Navbar />
      <Layout title={"Sales Report - Bakery Management App"}>
        <Stack direction={"flex"} spacing={2}>
          <Sidebar />
          <Box flex={4} p={2}>
            <Typography sx={{ mt: 3 }} variant="h6">
              Sales Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales?.map((sale) => (
                    <TableRow
                      key={sale._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {handleDate(sale.date)}
                      </TableCell>
                      <TableCell align="center">{sale.name}</TableCell>
                      <TableCell align="center">{sale.quantity}</TableCell>
                      <TableCell align="center">
                        ₱{sale.quantity * sale.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default SalesReport;
