import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SendIcon from "@material-ui/icons/Send";

import classes from "./HomePage.css";

import { NavLink } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class HomePage extends Component {
  state = {
    akcija: null,
    komponenta: null,
  };

  izmeni = (tipAkcije) => {
    this.state.akcija = tipAkcije;
    console.log(this.state.akcija);
  };

  render() {
    const mystyle = {
      color: "black",
      backgroundColor: "white",
      padding: "10px",
      textAlign: "center",
      textDecoration: "none",
      margin: "auto",
      width: "50%",
    };
    let grid = null;
    if (this.state.akcija == null) {
      grid = (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <StyledMenuItem>
                <ListItemIcon>
                  <NavLink
                    to="/kreirajKlijenta"
                    style={mystyle}
                    onClick={() => this.izmeni("kreirajKlijenta")}
                  >
                    <ListItemIcon>
                      <SendIcon fontSize="small" />
                    </ListItemIcon>
                  </NavLink>
                </ListItemIcon>
                <ListItemText primary="Kreiraj klijenta"></ListItemText>
              </StyledMenuItem>

              <StyledMenuItem>
                <ListItemIcon>
                  <NavLink
                    to="/pretraziKlijenta"
                    style={mystyle}
                    onClick={() => this.izmeni("pretraziKlijenta")}
                  >
                    <ListItemIcon>
                      <SendIcon fontSize="small" />
                    </ListItemIcon>
                  </NavLink>
                </ListItemIcon>
                <ListItemText primary="Pretrazi klijente" />
              </StyledMenuItem>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            <CardMedia
              style={{ width: "auto", height: 350 }}
              image="auto-pozadina.jpg"
              title="Pozadina"
            />
          </Paper>
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            style={{ marginTop: 10 }}
          >
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia image="favicon-car.png" title="Kreiranje racuna" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Kreiranje racuna
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Kreirajte racun za tehnicki pregled klijenta
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <NavLink
                  to="/kreirajRacun"
                  style={mystyle}
                  onClick={() => this.izmeni("kreiraj")}
                >
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginLeft: "auto" }}
                    >
                      kreiraj
                    </Button>
                  </CardActions>
                </NavLink>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="favicon-car.png"
                    title="Pretrazivanje racuna"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Pretrazivanje racuna
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Pretrazite racune za tehnicki pregled vozila
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <NavLink
                  to="/pretraziRacun"
                  style={mystyle}
                  onClick={() => this.izmeni("pretrazi")}
                >
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginLeft: "auto" }}
                    >
                      pretrazi
                    </Button>
                  </CardActions>
                </NavLink>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
    } else {
    }

    return <div>{grid}</div>;
  }
}

// const mapStateToProps = (state) => {
//   return {
//     fullUser: state.user.fullUser,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLogIn: (userFromDb) => dispatch(login(userFromDb)),
//   };
// };

export default HomePage;
