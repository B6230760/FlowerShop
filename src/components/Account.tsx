import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import { AccountsInterface, AddressesInterface } from "../models/Imodel";
import { UsersInterface } from "../models/Imodel";
import NavBar from "./Navbar";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from "@material-ui/core/Grid";
import CardContent from '@mui/material/CardContent';
import { Card } from "@mui/material";
import { CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({

  backgroundColor: theme.palette.mode === 'light' ? '#fff9c4' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(1),
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
    drawerHeader1: {
      display: 'flex',
      alignItems: 'right',
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

export default function Account() {
  const classes = useStyles();
  // const [account, setAccount] = useState<AccountsInterface[]>([]);
  // const [address, setAddress] = useState<AddressesInterface[]>([]);
  const [user, setUser] = useState<UsersInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  // const getAccount = async () => {
  //   let uid = localStorage.getItem("uid");
  //   fetch(`${apiUrl}/accounts/${uid}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data) {
  //         setAccount(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };
  const getUser = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/users/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    // getAccount();
    // getAddress();
    getUser();
  }, []);

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
          <Grid container spacing={4}>
            {user.map((item: UsersInterface) => (
              <Grid item xs={12} sm={12} md={12}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, fontSize: 14 }}>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <Typography
                          style={{ fontFamily: "Mali" }}
                          component="h2"
                          variant="h6"
                          color="primary"
                          gutterBottom
                          align="inherit"
                        >
                          About Me
                        </Typography>
                        <Typography variant="h6" style={{ fontFamily: "Mali" }}>
                          <b>ชื่อ&nbsp;&nbsp;</b>{item.Name}
                        </Typography>
                        <Typography variant="h6" style={{ fontFamily: "Noto Serif Thai" }}>
                          <b>เพศ&nbsp;&nbsp;</b>{item.Prefix}
                        </Typography>
                        <Typography variant="h6" style={{ fontFamily: "Noto Serif Thai" }}>
                          <b>เบอร์โทรศัพท์&nbsp;&nbsp;</b>{item.Tel}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} >
                      <div className={classes.drawerHeader1} />
                        <img className={classes.image} src={item.ImgPath} alt={item.Name} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Box>
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
          <Grid container spacing={4} >
            {user.map((item: UsersInterface) => (
              <Grid xs={12} sm={12} md={12}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >

                  <CardContent sx={{
                    flexGrow: 1,
                    fontSize: 14,
                    maxWidth: 345,
                    height: 140
                  }}>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Adress
                    </Typography>
                    {/* <img className={classes.image} src={item.ImagePath} alt={item.NameProduct} /> */}
                    <Typography variant="h6" style={{ fontFamily: "Mali" }}>
                      <b>บ้านเลขที่&nbsp;&nbsp;</b>{item.HouseNo}
                    </Typography>
                    <Typography variant="h6" style={{ fontFamily: "Noto Serif Thai" }}><b>อำเภอ&nbsp;&nbsp;</b>{item.Province}</Typography>
                    <Typography variant="h6" style={{ fontFamily: "Noto Serif Thai" }}><b>จังหวัด&nbsp;&nbsp;</b>{item.District}</Typography>
                    <Typography variant="h6" style={{ fontFamily: "Noto Serif Thai" }}><b>รหัสไปรษณีย์&nbsp;&nbsp;</b>{item.PostalCode}</Typography>
                    <Typography variant="h6" style={{ fontFamily: "Noto Serif Thai" }}><b>ประเทศ&nbsp;&nbsp;</b>{item.Country}</Typography>

                  </CardContent>

                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}