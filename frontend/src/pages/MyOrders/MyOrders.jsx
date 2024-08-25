import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {assets} from '../../assets/assets'

const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    // eslint-disable-next-line no-unused-vars
    const [data,setData] = useState([]);

    const fetchOrders = async() => {
        try {
            const response = await axios.post(url+'/api/order/userorders',{},{headers:{token}});//we'll get the information from backend from this url to get the data in response by providing the token
            setData(response.data.data); //we'll set data to the recieved data 
            console.log(response.data.data);
        } catch (error) {
            console.log("Cannot fetch orders:", error);
        }
    }

    useEffect(()=>{
      if(token){
        fetchOrders(); //if a token is there we'll perform fetch order
      }
    },[token]) //whenever the token is updated

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item,index)=>{
                  if(index === order.items.length-1){    //displaying the last item 
                    return item.name+" x "+item.quantity //for last item no comma
                  } else{
                    return item.name+" x "+item.quantity+', ' //for all other items comma 
                  }
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders