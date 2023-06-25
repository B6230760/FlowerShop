import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import { CartsInterface, StoresInterface } from "../models/Imodel";
import NavBar from "./Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import { TableCell } from "@material-ui/core";
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
    cellContainer: {
      display: "flex",
      alignItems: "left",
      justifyContent: "center",
      gap: "30px",
    },

    image: {
      width: '20%',
      height: '8%',
    },
  })
);

export default function ProductDetail() {
  const classes = useStyles();
  const [stID, setStID] = useState('');
  const [statusID] = useState('2');
  const [store, setStores] = useState<StoresInterface[]>([]);
  const [product, setProducts] = useState<Partial<CartsInterface>>(
    {}
  );


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
  };

  

  
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const name = event.target.id as keyof typeof product;
    setProducts({
      ...product,
      [name]: event.target.value,
    });
  };

  const getStore = async () => {
    const id = window.location.pathname.split("/")[2];
    setStID(id);
    fetch(`${apiUrl}/store/${id}`, requestOptions)
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

  useEffect(() => {
    getStore();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  function submit() {
    if (!product.Item) {
      alert("กรุณากรอกจำนวนสินค้า");
      return;
    }
    let uid = localStorage.getItem("uid");
    let data = {
      StoreID: convertType(stID),
      Item: convertType(product.Item),
      StatusID: convertType(statusID),
      UserID: Number(uid),
    };

    console.log("YYY", data);
    if (product.Item > store[0].Amount) {
      alert("จำนวนสินค้าในคลังไม่เพียงพอ");
      return;
    }

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/carts`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMessage("");
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" style={{ fontFamily: "Mali" }}>
            เพิ่มลงตะกร้า
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} >
          <Alert onClose={handleClose} severity="error" style={{ fontFamily: "Mali" }}>
            เพิ่มลงตะกร้าไม่สำเร็จ: {errorMessage}
          </Alert>
        </Snackbar>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table" >
            {store.map((item: StoresInterface) => (
              <TableRow>
                <TableCell align="left">
                  <div className={classes.cellContainer}>
                    <img className={classes.image} src={item.ImagePath} alt={item.NameProduct} />
                    <Typography gutterBottom variant="h5" style={{ fontFamily: "Mali" }} >
                      <span>
                        {item.NameProduct}<br />{item.ID} {item.Namestore}<br /> {item.Description}<br />ราคาต่อชิ้น : {item.Price} บาท<br />จำนวนสินค้าในคลัง : {item.Amount}
                      </span>
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            <div className={classes.cellContainer}>
              <Grid item xs={6} >

                <p >จำนวนสินค้า</p>

                <FormControl fullWidth variant="outlined">

                  <TextField

                    id="Item"

                    variant="outlined"

                    type="number"

                    size="medium"

                    InputProps={{ inputProps: { min: 1 } }}

                    InputLabelProps={{ shrink: true, }}

                    value={product.Item || ""}

                    onChange={handleInputChange}

                  />

                </FormControl>

              </Grid>
            </div>
            <div className={classes.cellContainer}>
              <TableRow>
                <span>
                  <br />
                </span>
              </TableRow>
              <TableRow >
                <TableCell>
                  <Box display="flex">
                    <Box>
                      <Button

                        component={RouterLink}
                        to="/"
                        variant="contained"
                      >
                        กลับ
                      </Button>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex">

                    <Box>
                      <Button

                        variant="contained"
                        onClick={submit}
                        color="primary"
                        size="small">
                        เพิ่มลงตะกร้า
                      </Button>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </div>
            <TableRow>
              <span>
                <br />
              </span>
            </TableRow>
          </Table>
        </TableContainer>
      </Container>
    </div >
  );
}