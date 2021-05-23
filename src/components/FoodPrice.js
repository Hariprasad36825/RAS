import axios from "axios";
import React, { Component } from "react";
import "./FoodPrice.css";
import Expire from "./Expire.js";
import DeleteIcon from '@material-ui/icons/Delete';
import {red, deepPurple} from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from "@material-ui/core/Button";
import Cookies from 'js-cookie'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

class FoodPrice extends Component {
  state = { FoodList: [], changed: {}, value: "" };
  componentDidMount() {
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/GetFoods',
      method:'POST',
       data:{},
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
    .then((response) => {
      
      this.setState({ FoodList: response.data });
    });
  }

  handleDelete=(index)=>{

    let name=this.state.FoodList[index][1]
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/DeleteFood',
      method:'POST',
       data:{
        name:name,
       },
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
      .then((response) => {
          let userArr = response.data;

          if (typeof userArr === "object") {
            this.setState({ FoodList: userArr });
          } 
        })

        .catch((error) => console.log(error));

  }

  handleAdd = (item, index) => {
    item[2] = item[2] + 1;
    let temp = [...this.state.FoodList];
    let newChange = {};
    Object.assign(newChange, this.state.changed);
    temp[index][2] = item[2];
    newChange[item[0]] = item[2];
    temp[index][2] = item[2];
    this.setState({ FoodList: temp, changed: newChange });
  };
  handleSub = (item, index) => {
    if (item[2] > 5) {
      item[2] = item[2] - 1;
      let temp = [...this.state.FoodList];
      let newChange = {};
      Object.assign(newChange, this.state.changed);
      temp[index][2] = item[2];
      newChange[item[0]] = item[2];
      temp[index][2] = item[2];
      this.setState({ FoodList: temp, changed: newChange });
    } else {
      alert("Price cannot be less than 5");
    }
  };
  updatDb = () => {
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/UpdatePrice',
      method:'POST',
       data:this.state.changed,
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
      .then((response) => {
      this.setState({value: "done"})
      console.log(response.data)
      this.setState({ value: response.data });
    });
  };
  render() {
    return (
      <div>
        <table style={{width:"75%", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>
          <thead align = "center">
            <tr>
              <th>ITEM CODE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {this.state.FoodList.map((item, index) => {
              return (
                <tr key={item[0]}>
                  <td>{item[0]}</td>
                  <td>{item[1].toString().toUpperCase()}</td>
                  <td>
                    <RemoveIcon onClick={() => this.handleSub(item, index)} style={{ color: deepPurple[700], fontSize:"25px", float:'left'}}/>
                    {item[2]}
                    <AddIcon onClick={() => this.handleAdd(item, index)} style={{ color: deepPurple[500], fontSize:"30px", float:'right'}} />
                  </td>
                  <td>                    
                  <DeleteIcon onClick={()=>{this.handleDelete(index)}} style={{ color: red[500], fontSize:"30px"}}/>
                  </td>
                </tr>
              );
            })}
            <tr >
              <td colSpan={4} align="right" float = "right">
                <Button
                  onClick={this.updatDb}
                  disabled={Object.entries(this.state.changed).length === 0}
                  variant = 'contained'
                  color="primary"
                  style={{float:'right'}}
                >
                Update Prices
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        
        
        
        {this.state.value === "Success" && (
          <Expire delay="3000">
            <div className="alert alert-success" role="alert">
              success price list updated
            </div>
          </Expire>
        )}
        {this.state.value === "Db error" && (
          <Expire delay="3000">
            <div className="alert alert-danger" role="alert">
              Price list not updated, Try again later
            </div>
          </Expire>
        )}
      </div>
    );
  }
}

export default FoodPrice;
