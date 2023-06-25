import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { BillsInterface, CartsInterface, StoresInterface } from "../models/Imodel";


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

export default function Billlist() {

    const classes = useStyles();
    const [bill, setbills] = useState<BillsInterface[]>([]);
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

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof bill;
        setbills({
            ...bill,
            [name]: event.target.value,
        });
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

    const getBills = async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/bills/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setbills(res.data);
                } else {
                    console.log("else");
                }
            });
    };
  

    useEffect(() => {
        getBills();
    }, []);

    return (
        <div>
            <NavBar />
            <div className={classes.drawerHeader} />
            <Container className={classes.container} maxWidth="md">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            คำสั่งซื้อ
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/"
                            variant="contained"
                            color="default"
                        >
                            เลือกสินค้าเพิ่มเติม
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper} className={classes.tableSpace}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="center" width="20%">
                                    
                                </TableCell>
                                <TableCell align="center" width="45%">
                                    รายการสั่งซื้อ
                                </TableCell>
                                <TableCell align="center" width="15%">
                                    ชื่อผู้สั่ง
                                </TableCell>
                                <TableCell align="center" width="20%">
                                    ที่อยู่
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bill.map((item: BillsInterface) => (
                                <TableRow key={item.ID}>
                                    <TableCell align="center"><img className={classes.image} src={item.Cart.Store.ImagePath} /></TableCell>
    
                                    <TableCell align="center">
                                    <span>
                                    {item.Cart.Store.NameProduct} ร้าน {item.Cart.Store.Namestore}<br/><br/>
                                    จำนวนสินค้า{item.Cart.Item}ชิ้น 
                                    ราคาทั้งหมด{item.Cart.Item * item.Cart.Store.Price }<br/><br/>
                                    </span>
                                    </TableCell>
                                
    
                                    <TableCell align="center">{item.User.Name}</TableCell>
                               
                                    <TableCell align="center"> <span>บ้านเลขที่ {item.User.HouseNo} <br/>
                                    อำเภอ {item.User.District}<br/> จังหวัด {item.User.Province}<br/> ประเทศ
                                    {item.User.Country} {item.User.PostalCode}</span></TableCell>
                                    </TableRow>
                                   
                                  
                                
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}