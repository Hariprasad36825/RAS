import React, { Component } from "react";
import axios from "axios";
import printJS from "print-js";
import Cookies from 'js-cookie'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'
class Bill extends Component {
  componentDidMount() {
    console.log(this.props.data.order);
    const csrftoken = Cookies.get('csrftoken')
    axios({
      url:'api/BillGenerator',
      method:'POST',
       data:this.props.data,
       headers: {"X-CSRFToken": csrftoken},
       responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        printJS(url);
      })
      .catch((error) => console.log(error));
  }
  render() {
    console.log("success")
    return <div />;
  }
}

export default Bill;
