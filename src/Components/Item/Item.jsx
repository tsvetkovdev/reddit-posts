import React, { Component, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    backgroundColor: 'rgb(220, 238, 255)',
    borderRadius: '10px'
  },
  button: {
    marginBottom: '15px',
    width: '200px'
  },
  title: {
    width: '100%',
    margin: '30px',
    fontSize: '28px'
  },
  comments: {
   marginBottom: '15px'
  },
  link:{
    textDecoration: 'none',
    color: 'gray'
  },
  img: {
    width: '140px',
    height: '110px'
  },
  
 
  
  
  
}));

export default function Item (props) {
  const classes = useStyles()
  const data = props.data
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
        <Grid item className={classes.img}>
        {data.thumbnail_height ? 
        <img src={data.thumbnail} alt="" />
        : 
        <img className={classes.img} src={'img2.svg'} alt="" />
        }
        </Grid>
        <Typography variant="subtitle1">{data.title}</Typography>
        <Typography variant="subtitle2">Number of comments: {data.num_comments}</Typography>
        <Button>
        <a href={`https://www.reddit.com/${data.permalink}`} target="_blank" className={classes.link}>
          Go to post
        </a>
        </Button>
        </Paper>
      </div>
    );
 
}
