import React, { Component } from "react";
import axios from "axios";
import Expire from './Expire';
import Cookies from 'js-cookie'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

class Users extends Component {
  state = { result: [] };
  
  
  componentDidMount() {
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/getUsers',
      method:'POST',
       data:{},
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
    .then((response) => {

        let userArr = response.data;

        if (userArr.length !== 0) {

          
          this.setState({result:userArr});
  
        }

      })

      .catch((error) => console.log(error));
  }

  handleOperation=(item)=>{

    if(item.type==="Owner")
    { 
        this.setState({showalert:true});
    }

    else{

    console.log(item);
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/deleteUsers',
      method:'POST',
       data:{
        email:item.email
       },
       headers: {"X-CSRFToken": csrftoken},
       responseType: 'json',
      })
    .then((response) => {

      let userArr = response.data;

      if (userArr.length !== 0) {

        
        this.setState({result:userArr});

      }

    })

    .catch((error) => console.log(error));

  }

}

  render() {
    return (
      <div label="Users">
        <table style={{width:"75%", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>
          <thead align = "center">
            <tr>
              <th>EMAIL</th>
              <th>TYPE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map((item) => {
              return (
                <tr key={item.email}>
                  <td>{item.email}</td>
                  <td>{item.type}</td>
                  <td>
                    {" "}
                    <button
                      className="buttondecor"
                      onClick={() => this.handleOperation(item)}
                    >
                      <i className="fa fa-trash"></i> Remove{" "}
                    </button>
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.showalert && (<Expire delay="3000">
              <div className="alert alert-danger" role="alert">
                Owner cannot be deleted
              </div></Expire>)}
        
      </div>
    );
  }
}

export default Users;
