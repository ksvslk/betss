import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ListItem, ListItemAvatar, List, Avatar, ListItemText, Button, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';
import MovieIcon from '@material-ui/icons/Movie';
import store from '../redux/store';
import { fetchingMoreAction, loadedMoreAction, fetchingDetailsAction } from '../redux/actions';
import { container } from 'inversify-props';
import { IMovieRepository } from '../repository/IMovieRepository';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    root: {
      width: 'flex',
      backgroundColor: theme.palette.background.paper,
      marginLeft: theme.spacing(2),
    },
    inline: {
      display: 'inline',
    },
    button: {
      width: '100%'
    },
    results: {
      fontFamily: 'Goudy Bookletter 1911'
    },
    circ: {
      display: 'block',
      marginTop: '15%',
      marginBottom: '15%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    imgResults: {
      display: 'block',
      marginBottom: '12%',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 800,
      width: '100%',
      height: 'auto'
    }
  }),
);

const fetchMoreResults = (keyword: string, pageNumber: number) => {
  store.dispatch(fetchingMoreAction())
  const repository = container.get<IMovieRepository>('MovieRepository')
  repository.getSearchResults(keyword, pageNumber)
    .then((m) => {
      store.dispatch(loadedMoreAction(m?.movies))
    }).finally(() => { window.scrollTo(0, document.body.scrollHeight) })
}

const SearchPage: React.FC = () => {

  let history = useHistory();

  const classes = useStyles();
  const state: AppState = useSelector(
    state => {
      return (state as AppState)
    }
  )
  function navigateToDetails(imdbID: string) {
    store.dispatch(fetchingDetailsAction(imdbID))
    history.push({
      pathname: '/details',
      search: `?id=${imdbID}`
    });
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={classes.grow}>
      {state.loadingSearch ? <CircularProgress className={classes.circ} /> :
        <List component="nav" className={classes.root}>
          {state.moviesSearchResult?.map(movie =>
            <ListItem onClick={() => navigateToDetails(movie.imdbID)} divider button key={movie.imdbID.toString()+Date.now()} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Poster" src={movie.Poster} />
              </ListItemAvatar>
              <ListItemText
                primary={movie.Title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {movie.Year}
                    </Typography>
                    {' - ' + capitalizeFirstLetter(movie.Type)}
                  </React.Fragment>
                }
              />
            </ListItem>
          )}
        </List>
      }
      {state.loadingSearch !== true ?
        state.totalPagesCount === 0 || state.totalPagesCount < state.currentSearchPageNumber ? <p></p> :
          <Container>
            {state.loadingMoreResults ? <LinearProgress style={{ margin:25 }} variant="query" /> :
              <Button
                onClick={() => fetchMoreResults(state.currentSearchKeyWord, state.currentSearchPageNumber)}
                color="primary"
                size="large"
                variant="outlined"
                className={classes.button}
                startIcon={<MovieIcon />}
              >
                {console.log('state.totalPagesCount - ' + state.totalPagesCount)}
                {console.log('state.currentSearchPageNumber - ' + state.currentSearchPageNumber)}
                {console.log('state.moviesSearchResult.length - ' + state.moviesSearchResult?.length)}
                More results for "{state.currentSearchKeyWord.toString()}"
      </Button>
            }

          </Container>
        : <p></p>
      }
      <div>
        {state.loadingSearch !== true
          ? state.moviesSearchResult?.length === 0 || state.moviesSearchResult === undefined
            ? <img alt="No results" className={classes.imgResults} src={require('../img/empty-result_shot.png')} />
            : <p></p>
          : <p></p>}
      </div>
    </div>
  );
}

export default SearchPage;


