import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableRow, TableHead, TableCell, TableBody, Table, Button} from '@material-ui/core';
import Cookies from 'js-cookie'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

export default function PurchaseList(){
    const [purchase_list, set_purhase_list] = useState([])

    useEffect(()=>{
        const csrftoken = Cookies.get('csrftoken')
        axios({
        url:'api/GetPurchaseList',
        method:'GET',
        headers: {"X-CSRFToken": csrftoken},
        responseType: 'json',
        })
        .then((res) =>{
            set_purhase_list(res.data)
        })
    },[])

    const handleSubmit = () =>{
        const csrftoken = Cookies.get('csrftoken')
        axios({
        url:'api/GetPurchaseList',
        method:'POST',
        data:{},
        headers: {"X-CSRFToken": csrftoken},
        responseType: 'json',
        })
        .then((res) =>{
            set_purhase_list(res.data)
        })
    }

    return(
        <div>
            <center><h1>PURCHASE LIST</h1></center>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Ingredient name</TableCell>
                    <TableCell>Required amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{purchase_list[0]?( purchase_list.map((cell)=>(
                    <TableRow key={cell[0]}>
                        <TableCell>{cell[0] }</TableCell>
                        <TableCell>{cell[1] }</TableCell>
                        <TableCell>{cell[2] + " units"}</TableCell>
                    </TableRow>
                ))):
                <TableRow>
                    <TableCell colSpan={3}>No items to purchase</TableCell>
                </TableRow>}
                </TableBody>
            </Table>
            {purchase_list[0] && <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}>
                    Ordered
            </Button>}
        </div>
    )
}