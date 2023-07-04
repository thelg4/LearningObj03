import React from 'react'
import {
  useEffect, 
  useState
} from "react";



function HomePage() {

  const [orderItems, setOrderItems] = useState([])

  const fetchOrderItemData = () =>  {
    fetch("/api/OrderItem/GetAll")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setOrderItems(data)
      })
  }

  useEffect(() => {
    fetchOrderItemData()
  }, [])

  return (
    <div className="card w-full bg-base-300 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">Ordering System</h2>
            <p className="text-center"> Welcome to our ordering system! </p>
            <div>
              <h1>Order Items</h1>
              {orderItems.length > 0 && (
                <ul>
                  {orderItems.map(orderItem => (
                    <li key={orderItem.id}>{orderItem.name}</li>
                  ))}
                </ul>
              )}
            </div>
        </div>
    </div>

    
  )
}

export default HomePage