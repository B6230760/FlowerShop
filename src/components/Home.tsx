import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { StoresInterface } from "../models/Imodel";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        container: {
            marginTop: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
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
            width: '100%',
            height: '60%',
        },
        
    })
);


const theme = createTheme();

export default function Album() {
    
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [stores, setStore] = useState<StoresInterface[]>([]);

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
        const name = event.target.name as keyof typeof stores;
        setStore({
            ...stores,
            [name]: event.target.value,
        });
    };


    const getStores = async () => {
        fetch(`${apiUrl}/stores`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStore(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getStores();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    return (
        <div>
            <NavBar />
            <div className={classes.drawerHeader} />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4} >
                            {stores.map((item: StoresInterface) => (
                                <Grid item key={item.ID} xs={8} sm={6} md={4}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', color: ''}}
                                    >

                                        <CardContent sx={{ flexGrow: 1, 
                                         maxWidth: 345,
                                         height: 425
                                         
                                        }}>
                                            <img className={classes.image} src={item.ImagePath} alt={item.NameProduct}/>
                                            <Typography gutterBottom variant="h5" component="h2" style={{fontFamily:"Mali"}}>
                                               <b>{item.NameProduct}</b> 
                                            </Typography>
                                            <Typography style={{fontFamily:"Noto Serif Thai"}}>{item.Namestore}</Typography>
                                            <Typography style={{fontFamily:"Noto Serif Thai"}}>{item.Description}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/store/${item.ID}`}>
                                                <button type="submit" className="btn btn-default" style={{fontFamily:"Source Code Pro"}}>
                                                    view
                                                </button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    );
}
