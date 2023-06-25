import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as React from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { CartsInterface, StoresInterface,StatussInterface } from "../models/Imodel";
import NavBar from "./Navbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 10,
    },
    tableSpace: {
      marginTop: 10,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  })
);

export default function Cart() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedCartItems, setSelectedCartItems] = useState<CartsInterface[]>([]);
  // const [status, setStatus] = useState<StatussInterface[]>([]);
  const [selectedItemsFromLocation, setSelectedItemsFromLocation] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedItemsFromLocation);
  const [carts, setCarts] = useState<CartsInterface[]>([]);
  const [stores, setStores] = useState<StoresInterface[]>([]);
  const [billedItems, setBilledItems] = useState<number[]>([]);
  const [previouslySelectedItems, setPreviouslySelectedItems] = useState<string[]>([]);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getCart = async () => {
    let uid = localStorage.getItem("uid")
    fetch(`${apiUrl}/carts/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCarts(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getStore = async () => {
    fetch(`${apiUrl}/stores`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setStores([res.data]);
        } else {
          console.log("else");
        }
      });
  };
  const getStatus= async () => {
    fetch(`${apiUrl}/statuss`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setStores(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getCart();
    getStore();
    
    const storedSelectedItems = localStorage.getItem("selectedItems");
    if (storedSelectedItems) {
    setSelectedItems(JSON.parse(storedSelectedItems));
    const storedPreviouslySelectedItems = localStorage.getItem("selectedItems");
  if (storedPreviouslySelectedItems) {
    setPreviouslySelectedItems(JSON.parse(storedPreviouslySelectedItems));
  }
  }

  const storedBilledItems = localStorage.getItem("billedItems");
  if (storedBilledItems) {
    setBilledItems(JSON.parse(storedBilledItems));
  }
  }, []);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allItemIds = carts.map((item) => item.StoreID.toString());
      setSelectedItems(allItemIds);
      setSelectedCartItems(carts);
    } else {
      setSelectedItems([]);
      setSelectedCartItems([]);
    }
  };
  
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    if (event.target.checked) {
      const isItemSelected = previouslySelectedItems.includes(itemId);
  
      if (!isItemSelected) {
        setSelectedItems((prevSelected) => [...prevSelected, itemId]);
        const selectedCartItem = carts.find((item) => item.StoreID.toString() === itemId);
        if (selectedCartItem) {
          setSelectedCartItems((prevSelected) => [...prevSelected, selectedCartItem]);
        }
      }
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId));
      setSelectedCartItems((prevSelected) =>
        prevSelected.filter((item) => item.StoreID.toString() !== itemId)
      );
    }
  };
  
  
  // const handlePayment = () => {
  //   const uniqueSelectedCartItems = uniqBy(selectedCartItems, 'StoreID');
  
  //   const isNoDuplicates = uniqueSelectedCartItems.every((item) =>
  //     previouslySelectedItems.includes(item.StoreID.toString())
  //   );
  
  //   if (isNoDuplicates) {
  //     navigate("/bill", { state: { selectedItems: uniqueSelectedCartItems } });
  //   } else {
  //     alert("มีการเลือกสินค้าที่ซ้ำกัน โปรดตรวจสอบและแก้ไข");
  //   }
  // };
  
  
  
  

  const handlePayment = () => {
    navigate("/bill", { state: { selectedItems: selectedCartItems } });
  };
  
    

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              สินค้าที่อยู่ในตะกร้า
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  <Checkbox
                    checked={selectedItems.length === carts.length}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < carts.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อสินค้า
                </TableCell>
                <TableCell align="center" width="10%">
                  ร้านค้า
                </TableCell>
                <TableCell align="center" width="10%">
                  ราคาต่อชิ้น
                </TableCell>
                <TableCell align="center" width="10%">
                  จำนวนสินค้า
                </TableCell>
                <TableCell align="center" width="10%">
                  ราคา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((item: CartsInterface) => (
                <TableRow key={item.StoreID}>
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedItems.includes(item.StoreID.toString())}
                      onChange={(event) => handleSelect(event, item.StoreID.toString())}
                    />
                  </TableCell>
                  <TableCell align="center">{item.Store.NameProduct}</TableCell>
                  <TableCell align="center">{item.Store.Namestore}</TableCell>
                  <TableCell align="center">{item.Store.Price}</TableCell>
                  <TableCell align="center">{item.Item}</TableCell>
                  <TableCell align="center">{item.Item * item.Store.Price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container justify="space-between">
            <Grid item>
              <Button component={RouterLink} to="/" variant="contained" color="default">
                กลับ
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handlePayment} variant="contained" color="default">
                ชำระเงิน
              </Button>
            </Grid>
          </Grid>
        </TableContainer>
      </Container>
    </div>
  );
}