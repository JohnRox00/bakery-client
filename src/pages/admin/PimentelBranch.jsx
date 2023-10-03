/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
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
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import SalesByBranchChart from "../../components/admin/SalesByBranchChart";
import Layout from "../../components/layouts/Layout";

const PimentelBranch = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [allSales, setAllSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    let url = `/api/v1/sales/branch/${state.id}`;
    let requestOptions = {
      method: "GET",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();
      setAllSales(data);
    } catch (err) {
      console.log(err.error.message || err.message);
    }
  };

  const handleDate = (date) => {
    let now = new Date(date);
    return now.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });
  };
  return (
    <>
      <AdminNavbar />
      <Layout title={"Admin - Pimentel Branch"}>
        <Stack direction={"row"} spacing={2}>
          <AdminSidebar />
          <Box flex={4} p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ marginBottom: 2 }}
            >
              <Typography sx={{ mt: 1 }} variant="h6">
                Monthly Sales
              </Typography>
              <Button
                variant="contained"
                sx={{ marginTop: 1 }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>
            <SalesByBranchChart dataSales={allSales} />
            <Typography sx={{ mt: 2 }} variant="h6">
              Product Sold
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                  {allSales.map((month) =>
                    month.sales.map((sale) => (
                      <TableRow
                        key={sale._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          {handleDate(sale.date)}
                        </TableCell>
                        <TableCell align="center">{sale.product}</TableCell>
                        <TableCell align="center">{sale.quantity}</TableCell>
                        <TableCell align="center">₱{sale.amount}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default PimentelBranch;
