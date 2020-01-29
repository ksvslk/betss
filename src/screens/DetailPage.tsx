import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Card, CardContent, Typography, CircularProgress, Button } from '@material-ui/core';
import { AppState } from '../redux/types';
import { useSelector } from 'react-redux';
import ImdbBackground from '../img/imdb.png';
import PlaceholderImg from '../img/placeholder.jpeg';
import store from '../redux/store';
import { fetchingDetailsAction, loadedDetailsAction } from '../redux/actions';
import { container } from 'inversify-props';
import { IMovieRepository } from '../repository/IMovieRepository';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img: {
    maxWidth:'100%',
  },
  card: {
    minWidth: 275,
    height:'100%',
  },
  cardContent: {
    padding: theme.spacing(4)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  imdbButton: {
    backgroundImage: `${ImdbBackground}`,
    width:100,
    background:'#f5de50',
    fontFamily: "Helvetica",
    fontWeight: 500,
    fontStyle:'bold',
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase"
  },
  circ: {
    display: 'block',
    marginTop: '15%',
    marginBottom: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}),
);

const fetchMovieDetails = () => {
  const imdbID = window.location.search.substr(4)
  store.dispatch(fetchingDetailsAction(imdbID))
  const repository = container.get<IMovieRepository>('MovieRepository')
  repository.getMovieDetailsByImdbId(imdbID)
    .then((d) => {
      store.dispatch(loadedDetailsAction(d))
    })
}

const DetailPage: React.FC = () => {

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const classes = useStyles();
  const state: AppState = useSelector(
    state => {
      return (state as AppState)
    }
  )
  return (
    <div className={classes.root}>
      {state.loadingDetails || state.detailPageState === undefined ? <CircularProgress className={classes.circ} /> :
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
      <Paper className={classes.paper}>

        {state.detailPageState?.Poster !== "N/A" ?
          <img className={classes.img} alt="Poster" src={state?.detailPageState?.Poster}/> :
          <img className={classes.img} alt="Poster" src={PlaceholderImg}/>
        }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={9}>
      <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" component="h2">
        {state.detailPageState?.Title}<Typography className={classes.pos} color="textSecondary">
        {'(' + state.detailPageState?.Year + ')'}
        </Typography>
        </Typography>
  
        <Typography variant="body2" component="p">
        {state.detailPageState?.Plot}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          <br></br>
           {state.detailPageState?.Runtime + ' | ' + state.detailPageState?.Genre}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
        <br></br>
        Rating: {state.detailPageState?.imdbRating }
        </Typography>
        <Button onClick={() => { window.open(`https://www.imdb.com/title/${state.detailMovieID}`, '_blank')}} className={classes.imdbButton}>IMDB</Button>
      </CardContent>
    </Card>
      </Grid>
    </Grid>
    }
  </div>
  );
}

export default DetailPage;
