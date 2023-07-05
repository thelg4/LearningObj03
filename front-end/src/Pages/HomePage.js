import React from 'react'
import {
  useEffect, 
  useState
} from "react";

import OrderItems from '../Components/OrderItems';
import Info from '../Components/Info';
import TakeoutOrders from '../Components/TakeoutOrders';
import DeliveryOrders from '../Components/DeliveryOrders';


function HomePage() {

  return (
    
    <div className="flex flex-col space-y-6">
      <Info />
      <OrderItems />
      <TakeoutOrders />
      <DeliveryOrders />
    </div>

    
  )
}

export default HomePage