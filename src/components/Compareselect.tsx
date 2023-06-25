import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
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
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    

  })
);

export default function CompareSelect() {

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");


  const classes = useStyles();
  const [store1ID, setStore1ID] = useState("");
  const [store2ID, setStore2ID] = useState("");
  const [store, setStores] = useState<StoresInterface[]>([]);
  const [compare, setCompare] = useState<CompareselctsInterface[]>([]);

  const [filteredStores, setFilteredStores] = useState<StoresInterface[]>([]);
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

  const handleChangeStore1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStore1ID(event.target.value as string);
  };

  const handleChangeStore2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStore2ID(event.target.value as string);
  };

  useEffect(() => {
    if (store1ID !== "" && store.length > 0) {
      // กรองร้านค้าในร้านที่ 2 เฉพาะสินค้าที่มีอยู่ในร้านที่ 1
      const filteredStores = store.filter(
        (item) =>
          item.ID !== parseInt(store1ID) &&
          item.NameProduct === store.find((store) => store.ID === parseInt(store1ID))?.NameProduct
      );

      // อัปเดตรายการร้านค้าที่แสดงใน selectbox ของร้านที่ 2
      setFilteredStores(filteredStores);
      if (filteredStores.length === 0) {
        alert("กรูณาเลือกสินค้าใหม่ เนื่องจากไม่มีสินค้าให้เปรียบเทียบ");
      }
      
    }
  }, [store1ID, store]);


  const handleDateChange = (date: Date | null) => {
    console.log(date);
  };

  const getStore = async () => {
    setError(false);
    setErrorMessage("");
    fetch(`${apiUrl}/stores`, requestOptions)
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
    getStore();
  }, []);

  // const convertType = (data: string | number | undefined) => {
  //   let val = typeof data === "string" ? parseInt(data) : data;
  //   return val;
  // };

  // const submit = () => {
  //   console.log("store1ID:", store1ID);
  //   console.log("store2ID:", store2ID);
  //   if (store1ID === "" || store2ID === "") {
  //     setError(true);
  //     setErrorMessage("กรุณาเลือกร้านค้าทั้งสองร้าน");
  //     return;
  //   }

  //   let data = {
  //     CompareID1: convertType(store1ID),
  //     CompareID2: convertType(store2ID),
  //   };

  //   const requestOptionsPost = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   };

  //   fetch(`${apiUrl}/compares`, requestOptionsPost)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         console.log("บันทึกได้", res.data);
  //         setSuccess(true);
  //         navigate("/comparelist");
  //       } else {
  //         console.log("บันทึกไม่ได้");
  //         setError(true);
  //         setErrorMessage(res.error);
  //       }
  //     });
  // };


  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">
        {error && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <Typography color="textPrimary">สินค้า</Typography>
            <Select
              native
              value={store1ID}
              onChange={handleChangeStore1}
              inputProps={{
                name: "ID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกสินค้า
              </option>
              {store.map((item: StoresInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.NameProduct}-{item.Namestore}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <FormControl fullWidth variant="outlined">
          <Typography color="textPrimary">ร้านที่ 1</Typography>
          <Select
            native
            value={store2ID} // <-- Changed from store1ID to store2ID
            onChange={handleChangeStore2} // <-- Updated the function name
            inputProps={{
              name: "ID",
            }}
          >
            <option aria-label="None" value="">
              กรุณาเลือกร้านค้าที่ต้องการเปรียบเทียบ
            </option>
            {filteredStores.map((item: StoresInterface) => (
              <option value={item.ID} key={item.ID}>
                {item.NameProduct}-{item.Namestore}
              </option>
            ))}
          </Select>
        </FormControl>
        <Grid item xs={12}></Grid>
        <Button 
          style={{ float: "right" }}
          color="secondary"
          variant="contained"
        >
          <Link
            style={{ float: "right", color: 'white' }} 
            color="default"
           to={{pathname: `/comparelist`, search: `?store1=${(store1ID)}&store2=${(store2ID)}`,}}        
          >
            เปรียบเทียบสินค้า
          </Link>
        </Button>

      </Container>
    </div>
  );
}