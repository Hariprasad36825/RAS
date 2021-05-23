import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Tables from './ManageTables';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Cookies from 'js-cookie'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    //backgroundImage: `url(${'https://allfreedesigns.com/wp-content/uploads/2015/06/black-patterns-5.jpg'})`,
    overflow: 'hidden',
    backgroundSize: '100%',
    margin: theme.spacing(1),
    padding: '0.8%',
  },
  gridList: {
    width: 950,
    height: 700,
    
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
}));



export default function ViewFood() {
  const classes = useStyles();
  const [tileData, setValue] = React.useState([]);
  const [changes, setChanges] = React.useState("");
  const [dochanges, setdoChanges] = React.useState("");
  const [food_list,setFoodList] = React.useState({});
  const [doclear,setdoclear] = React.useState("");
  const [temp,settemp] = React.useState([]);
  
    
  useEffect (() => {
     function updateFoodList(){
       if(localStorage.getItem(localStorage.getItem("curTable"))){
        setFoodList(JSON.parse(localStorage.getItem(localStorage.getItem("curTable"))))
        //setCurTable(parseInt(localStorage.getItem("curTable")))
        console.log(food_list)
       }
       else{
         setFoodList({})
       }
     }
   updateFoodList();
   },[])
        
   console.log(food_list)

  async function fetchFood() {
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/GetFoodsForClerk',
      method:'POST',
       data:{val: changes},
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
        .then((res) => {
            setValue(res.data)
            
            console.log(res.data)
        });
    }

    useEffect (() => {
      if (localStorage.getItem("curTable")){
        let food = temp;
        console.log(temp)
        console.log(food_list)
        if ((Object.keys(food_list).length === 0)){
          let update_food_list = food_list
          update_food_list[food[0]] = food
          setFoodList(update_food_list)
          console.log(food_list)
        }
        else if (!(Object.keys(food_list).includes(food[0]))){
          let update_food_list = food_list
          update_food_list[food[0]] = food
          setFoodList(update_food_list)
          console.log(food_list)
        }
        else{
          let update_food_list = food_list
          console.log(food_list)
          update_food_list[food[0]][1] += 1
          update_food_list[food[0]][2] += food[2]
          setFoodList(update_food_list)
        }
        console.log(food_list)
        localStorage.setItem(localStorage.getItem("curTable"),JSON.stringify(food_list))
        console.log(localStorage)
        setdoChanges(1)
      }
    },[food_list])


      useEffect (() => {
        fetchFood();
      },[])
    

    useEffect (() => {
      localStorage.setItem(localStorage.getItem("curTable"),JSON.stringify(food_list))
      setdoChanges(0)
    },[dochanges]
    )

    useEffect (() => {
      if(localStorage.getItem(localStorage.getItem("curTable"))){
        setFoodList(JSON.parse(localStorage.getItem(localStorage.getItem("curTable"))))
        console.log(food_list)
       }
       else{
         setFoodList({})
         
       }
      setdoclear(0)
      console.log(food_list)
    },[doclear]
    )


    const handleOnclick  = (food) =>{
      //setdoclear(1
      if (localStorage.getItem("curTable")){
        if (localStorage.getItem(localStorage.getItem("curTable"))){
          setFoodList(JSON.parse(localStorage.getItem(localStorage.getItem("curTable"))))
          settemp(food)
        }
        else{
          setFoodList({})
          settemp(food)
        }
      }
    }
    
    const handleChange = (event) => {
      setChanges(event.target.value);
      const csrftoken = Cookies.get('csrftoken')
      axios({
        url:'api/GetFoodsForClerk',
        method:'POST',
        data:{val: changes},
        headers: {"X-CSRFToken": csrftoken},
        responseType: 'json',
        })
        .then((res) => {
            setValue(res.data)
      });
      
    }


    
  
  return (
    <>
    <div className={classes.root} >
      <TextField 
          id="outlined-search" 
          label="Search field" 
          type="search" 
          onKeyUp={handleChange}
          onChange={handleChange}
          value = {changes}
          variant="outlined"
          style = {{width : "80%"}} 
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />    
        </div>
    <div class="flex-container">
      <div className="flex-item-left" className={classes.root} ><Tables/></div>
      <div className="flex-item-right" className={classes.root}>
        <GridList cellHeight={300}  cols={3} spacing={30} className={classes.gridList}>
          <GridListTile key="Subheader" cols={3}style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile >
          {tileData.map((tile) => (
            <GridListTile key={tile[0]}>
              <img src={tile[2]} alt={tile[0]} onClick = {() => handleOnclick([tile[0], 1, tile[1], tile[3]])}/>
              <GridListTileBar
                title={tile[3]+" - "+tile[0]}
                subtitle={"Price : ₹ " + tile[1]}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} > 
                    <FastfoodIcon/>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList> 
      </div>
    </div>
  </>
  );
}
