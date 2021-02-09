import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const ButtonAppBar = () => {
    const token = localStorage.getItem("token");
    const styles = {
        backgroundColor: "rgb(95 126 136)",
        position: "fixed",
        top: 0,
        left: 0
    }

    const LoginButton = () => (

        <Route render={({ history }) => (
            <Button
                color="inherit"
                onClick={() => { history.push(token ? '/logout' : '/login') }}
            >
                {token ? 'Logout' : 'Login'}
            </Button>
        )} />
    )

    const classes = useStyles();
    return (
        <div>
            <AppBar style={styles}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        TRELLO
                    </Typography>
                    <LoginButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;
