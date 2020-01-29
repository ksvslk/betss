import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { SvgIcon, Button } from '@material-ui/core';
import { fetchingAction, loadedAction } from '../redux/actions';
import store from '../redux/store';
import { container } from 'inversify-props';
import { IMovieRepository } from '../repository/IMovieRepository';

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
    root: {
      width: 'flex',
      backgroundColor: theme.palette.background.paper,
      marginLeft: theme.spacing(2),
    },
    inline: {
      display: 'inline',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const fetchResultsAction = (keyword: string, pageNumber:number) => {
  if(keyword.length >= 3) {
    store.dispatch(fetchingAction(keyword))
    const repository = container.get<IMovieRepository>('MovieRepository')
    repository.getSearchResults(keyword, pageNumber)
        .then((m) =>  {
            store.dispatch(loadedAction(m))
        })
  }
}

const HomePage: React.FC = () => {

  const [searchText, setSearchText] = useState('')
  const classes = useStyles()

  let history = useHistory();
  
  function handleSearchNavigation() {
    history.push("/search");
  }

  const searchByTitle = () => {
    if(searchText.length >= 3) {
      handleSearchNavigation()
      fetchResultsAction(searchText, 1)
      setSearchText('')
    }
  }

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static" color="primary" >
          <Toolbar>
            <IconButton onClick={() => handleSearchNavigation()} >
              <SvgIcon>
                <path fill="white" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
              </SvgIcon>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Find Movies
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    searchByTitle()
                  }
                }}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Button
            onClick={() => searchByTitle()}
        variant="contained"
        color="primary"
        className={classes.button}>
        Go
      </Button>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default HomePage;
