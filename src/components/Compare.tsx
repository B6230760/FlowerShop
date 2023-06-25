import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import NavBar from "./Navbar";
import { CompareselctsInterface, StoresInterface } from "../models/Imodel";

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
    image: {
      width: '90px',
      height: '150px',
    },

  })
);

export default function Compares() {

  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // const compareID1 = "CompareID1";
  // const compareID2 = "CompareID2";

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Sstore1 = searchParams.get("store1") || "";
  const Sstore2 = searchParams.get("store2") || "";
  const [store1Data, setStore1Data] = useState<Partial<StoresInterface>>({});
  const [store, setStores] = useState<StoresInterface[]>([]); // เปลี่ยนเป็น []
  
  const [store2Data, setStore2Data] = useState<Partial<StoresInterface>>({});

  console.log(Sstore1, Sstore2);
  const classes = useStyles();
  const [store1, setStores1] = useState<StoresInterface[]>([]);
  const [store2, setStores2] = useState<StoresInterface[]>([]);
  const [compare, setCompare] = useState<CompareselctsInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };


  const getCompare = async () => {
    fetch(`${apiUrl}/compares`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCompare(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getStore1 = async () => {
    fetch(`${apiUrl}/store/${Sstore1}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setStores(res.data); // อัปเดตค่า students ด้วยข้อมูลที่ได้รับ
          setStore1Data(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getStore2 = async () => {
    fetch(`${apiUrl}/store/${Sstore2}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log("2", res.data);
          setStores(res.data); // อัปเดตค่า students ด้วยข้อมูลที่ได้รับ
          setStore2Data(res.data); // กำหนดค่าให้กับ store2Data
        } else {
          console.log("else");
        }
      });
  };

  

  useEffect(() => {

    getCompare();
    getStore1();
    getStore2();


  }, []);

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
            style={{ float: "right", color: 'white' }} 
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              เปรียบเทียบสินค้า
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/compareselect"
              variant="contained"
              color="default"
            >
              กลับ
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ชื่อร้านค้า 1
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อร้านค้า 2
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              <TableRow >
                <TableCell align="center">
                  <span>
                    <img className={classes.image} src={store1Data.ImagePath} /><br />
                    <br />
                    ร้านค้า : {store1Data.Namestore}     
                    <br />
                    สินค้า : {store1Data.NameProduct}
                    <br />
                    คำอธิบาย : {store1Data.Description}
                    <br />
                    ราคาต่อชิ้น : {store1Data.Price}

                  </span>
                </TableCell>
                <TableCell align="center"> <span>
                    <img className={classes.image} src={store2Data.ImagePath} /><br />
                    <br />
                    ร้านค้า : {store2Data.Namestore}     
                    <br />
                    สินค้า : {store2Data.NameProduct}
                    <br />
                    คำอธิบาย : {store2Data.Description}
                    <br />
                    ราคาต่อชิ้น : {store2Data.Price}

                  </span></TableCell>

              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div >
  );
}