import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom"; // เพิ่ม useLocation ไปในการ import
import { useNavigate } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CardContent from '@mui/material/CardContent';
import Select from "@material-ui/core/Select";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
// import { AccountsInterface, AddressesInterface, BillsInterface, CartsInterface, PaymentsInterface, StoresInterface } from "../models/Imodel";
import {UsersInterface, BillsInterface, CartsInterface, PaymentsInterface, StoresInterface } from "../models/Imodel";

import NavBar from "./Navbar";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Account from "./Account";
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
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
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  })
);

export default function Bill() {
  const location = useLocation();
  const classes = useStyles();
  const [stID, setStID] = useState('');
  const [payment, setPayment] = useState<PaymentsInterface[]>([]);
  const [selectedCartIDs, setSelectedCartIDs] = useState<number[]>([]);
  const selectedItemss = location.state?.selectedItems || [];
  const [selectedItems, setSelectedItems] = useState<CartsInterface[]>(selectedItemss);

  const [store, setStores] = useState<StoresInterface[]>([]);
  // const [account, setAccounts] = useState<AccountsInterface[]>([]);
  // const [address, setAddresss] = useState<AddressesInterface[]>([]);
  const [user, setUser] = useState<UsersInterface[]>([]);

  const [cart, setCarts] = useState<CartsInterface[]>([]);
  const [selectedItemsFromLocation, setSelectedItemsFromLocation] = useState<string[]>([]);

  const [bill, setbills] = useState<Partial<BillsInterface>>(
    {}
  );
  // const [selectedCartItems, setSelectedCartItems] = useState<CartsInterface[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<CartsInterface[]>([]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    localStorage.removeItem("selectedItems");
  };


  const handleSelectItem = (item: CartsInterface) => {
    const updatedSelectedItems = [...selectedItems, item];
    setSelectedItems(updatedSelectedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
    console.log('selectedItem:', item);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof bill;
    setbills({
      ...bill,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const name = event.target.id as keyof typeof bill;
    setbills({
      ...bill,
      [name]: event.target.value,
    });
  };


  const getPayments = async () => {
    fetch(`${apiUrl}/payments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPayment(res.data);
        } else {
          console.log("else");
        }
      });
  };
  // const getAccount = async () => {
  //   fetch(`${apiUrl}/accounts`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setAccounts(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };
  // const getAddress = async () => {
  //   fetch(`${apiUrl}/addresss`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setAddresss(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };
  const getUser = async () => {
    let uid = localStorage.getItem("uid")
    fetch(`${apiUrl}/users/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getCart = async () => {
    let uid = localStorage.getItem("uid")
    fetch(`${apiUrl}/carts/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
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
        if (res.data) {
          setStores(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getPayments();
    getCart();
    getStore();
    getUser();

    const storedSelectedItems = localStorage.getItem("selectedItems");
    if (storedSelectedItems) {
      setSelectedItems(JSON.parse(storedSelectedItems));
    }

    const selectedItems = location.state?.selectedItems || [];
    setSelectedItems(selectedItems);
  }, []);


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      // AccountID: convertType(bill.UserID),
      CartID: convertType(selectedItems[0]?.ID || selectedCartItems[0]?.ID),
      // AddressID: convertType(bill.UserID),
      // USerID: convertType(bill.UserID),

      PaymentID: convertType(bill.PaymentID),
      UserID : Number(localStorage.getItem("uid")),
    };

    console.log('data', data)

    //   const requestOptionsPost = {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   };


    //   fetch(`${apiUrl}/bills`, requestOptionsPost)
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.data) {
    //         setSuccess(true);
    //         console.log("บันทึกได้",res.data);
    //       } else {
    //         setError(true);
    //         setErrorMessage(res.error);
    //       }
    //     });
    // }
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let uid = localStorage.getItem("uid")
    fetch(`${apiUrl}/bills`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // setSuccess(true);
          // console.log("บันทึกได้", res.data);
          // เรียกใช้ API เพื่อลบจำนวนสินค้าใน Store
          selectedItems.forEach((item: CartsInterface) => {
            const updatedAmount = item.Store.Amount - item.Item;
            const requestOptions = {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ Amount: updatedAmount }),
            };
            fetch(`${apiUrl}/stores/${item.StoreID}`, requestOptions)
              .then((response) => response.json())
              .then((res) => {
                if (res.data && item.Store.Amount > item.Item) {
                  setSuccess(true);
                  setErrorMessage("");
                } else {
                  console.log("บันทึกไม่ได้")
                  setError(true);
                  setErrorMessage(res.error);
                }
              });

            const requestOptions1 = {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              //body: JSON.stringify({ status: 3  }),
            };
            fetch(`${apiUrl}/carts/${item.ID}`, requestOptions1)
              .then((response) => response.json())
              .then((res) => {
                if (res.data) {
                  setSuccess(true);
                  setErrorMessage("");
                } else {
                  console.log("บันทึกไม่ได้")
                  setError(true);
                  setErrorMessage(res.error);
                }
              });

          });
        }
      });
  }

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            ชำระเงินสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
          ชำระเงินไม่สำเร็จ: {errorMessage}
          </Alert>
        </Snackbar>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table" >
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">รายการสินค้า:</Typography>
                {selectedItems.length > 0 && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">ชื่อสินค้า</TableCell>
                          <TableCell align="center">ชื่อร้านค้า</TableCell>
                          <TableCell align="center">จำนวน</TableCell>
                          <TableCell align="center">ราคาต่อหน่วย</TableCell>
                          <TableCell align="center">ราคาทั้งหมด</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedItems.map((item: CartsInterface) => (
                          <TableRow key={item.StoreID}>
                            <TableCell align="center">{item.Store.NameProduct}</TableCell>
                            <TableCell align="center">{item.Store.Namestore}</TableCell>
                            <TableCell align="center">{item.Store.Price}</TableCell>
                            <TableCell align="center">{item.Item}</TableCell>
                            <TableCell align="center">{item.Item * item.Store.Price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>


          </Table>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography color="textPrimary">
                ช่องทางการชำระเงิน
              </Typography>
              <Select
                native
                value={bill.PaymentID}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกช่องทางการชำระเงิน
                </option>
                {payment.map((item: PaymentsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Method}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography color="textPrimary">
                ชื่อ
              </Typography>
              <Select
                native
                value={bill.UserID}
                onChange={handleChange}
                disabled
              >
               
                {user.map((item: UsersInterface) => (
                 <option aria-label="None" value="">
                 {item.Name}
             </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <Typography color="textPrimary">
                  ที่อยู่
                </Typography>
                <Select
                  native
                  value={bill.UserID}
                  onChange={handleChange}
                  disabled
                >
                  {user.map((item: UsersInterface) => (
                    <option >
                      บ้านเลขที่ {item.HouseNo} อำเภอ {item.District} จังหวัด {item.Province},{item.Country} {item.PostalCode}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            <Button
              component={RouterLink}
              to="/cart"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              ยืนยันการชำระเงิน
            </Button>
          </Grid>
        </TableContainer>
      </Container>
    </div>
  );
}