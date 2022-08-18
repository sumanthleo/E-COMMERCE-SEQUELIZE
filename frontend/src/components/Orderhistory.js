import React, { useEffect, useState } from 'react';
import '../styles/orderhistory.css';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Orderhistory() {

    const [ orderDetailData, setOrderDetailData ] = useState([]);
    console.log(orderDetailData);
    // const { data, } = orderDetailData;
    // console.log(data)

    const users = useSelector((state) => state.user);
    const { userData, token, } = users;

    useEffect(() => {
        getOrderDetailData();
    }, [])

    const getOrderDetailData = async () => {
        try {
        const orderDetails = await axios.get(`http://localhost:8080/api/v1/auth/orders/${userData.id}`,
        {
            headers: {
            authorization: `Bearer ${token}`,
            },
        }
        );
        setOrderDetailData(orderDetails.data.data);
        }catch(e) {
        console.log('!!!!Error!!!!!!!!!', e)
        } 
    }

  return (
    <div>
        <div style={{marginLeft: '2%', marginTop: '20px', color:'green'}}>
            <h2>Preview Orders </h2>
        </div>
        {
            orderDetailData.map((orderData) => (
                <div style={{ border: '2px solid #E3E3E3', width: '90%', 
                marginLeft: '5%', marginRight: '5%', marginBottom: '5%', marginTop: '5%' }}>
                    <div style={{marginTop: '50px',}}>
                        <span 
                        style={{marginLeft: '4%', fontWeight: '500',  fontSize: '16px', backgroundColor:'#E3E3E3', 
                        padding: '8px 5% 8px 10px', marginTop: '15px'}}
                        >
                        Shipping Details
                        </span>
                        <div className='buyer_info'>
                            <div> {orderData.shippingaddress.address} </div>
                            <div> {orderData.shippingaddress.city}  </div>
                            <div> {orderData.shippingaddress.pincode} </div>
                        </div>
                    </div>
                    <div style={{marginTop: '30px',}}>
                        <span 
                        style={{marginLeft: '4%', fontWeight: '500',  fontSize: '16px', backgroundColor:'#E3E3E3', 
                        padding: '8px 5% 8px 10px', marginTop: '15px'}}
                        >
                        Products
                        </span>
                        <div className='buyer_info'>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Order Price</th>
                                    <th>Quantity</th>
                                    <th>Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>Iphone 12 pro</td>
                                    <td>&#8377; 65000</td>
                                    <td>1</td>
                                    <td>14-8-2022</td>
                                    </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Men Slim Fit Solid Formal Shirt</td>
                                    <td>&#8377; 4099</td>
                                    <td>2</td>
                                    <td>14-08-2022</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            ))
        }
        
        
    </div>
  )
}
