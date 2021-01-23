import React, {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Item from "../Item/Item";
import {useSelector, useDispatch} from 'react-redux'
import {addItems, refresh} from '../../redux/actions/items'
import { pure } from 'recompose';
import Loader from '../Loader/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
    height: '100vh',
    
    padding: theme.spacing(15),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'rgb(230, 238, 255)',
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
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
   
  },
  
  
  
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


function Main() {
  
  const classes = useStyles()
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)
  const autoRefresh = useSelector(state => state.autoRefresh)
  const [minComments, setMinComments] = useState(0)
  const [timer, setTimer] = useState()

  

  const Items = items.items

  useEffect(()=>{
    getItems()
  },[])

  async function getItems () {
   
    const res = await fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      const data = await res.json()
      dispatch(addItems(data.data.children))
      
      
  };

  
  const updateAutoRefresh = () => {
    
    if (autoRefresh) {
      clearInterval(timer);
      dispatch(refresh()); 
        
    } else {
      dispatch(refresh());
      setTimer(setInterval(getItems, 3000))
      
    }
  };

  const handleSliderChange = (event, newValue) => {
    setMinComments(newValue);
  };
  

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
          <Grid item className={classes.title}>
        <Typography  variant="h1" className={classes.comments}>Top Commented</Typography>
        <Grid item className={classes.comments}>current filter {minComments}</Grid>
        <Button
          className={classes.button}
          onClick={()=>{updateAutoRefresh()}}
        >
          {autoRefresh ? "Stop" : "Start"} auto refresh
        </Button>
        <PrettoSlider 
         valueLabelDisplay="auto" 
         aria-label="pretto slider"
         defaultValue={0} 
         onChange={handleSliderChange} 
         min={0} 
         max={500} 
         step={1}
         />
        </Grid>
        {Items ? (
            
            Items.filter(item => item.data.num_comments >= minComments)
            .sort((a, b) => b.data.num_comments - a.data.num_comments)
            .map((item) => <Item key={item.data.id} data={item.data} />)
           
        ) : (
          <Loader />
           )}

           </Grid>
           </Paper>
      </div>
    );
  }


export default pure(Main)