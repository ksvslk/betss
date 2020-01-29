import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

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
}),
);

const DetailPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
      <Paper className={classes.paper}>
        <img className={classes.img} alt="Poster" src="https://m.media-amazon.com/images/M/MV5BYjZlYmJjYWYtZDM0NS00YmZlLWIyMTAtMDY5ZTNjZTgwMDhjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={9}>
      <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
         tere
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </Grid>
    </Grid>
  </div>
  );
}

export default DetailPage;
