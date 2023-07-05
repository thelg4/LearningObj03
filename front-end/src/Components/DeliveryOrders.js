import React from 'react'
import {
    useState, 
    useEffect
} from 'react'


function DeliveryOrders() {

    const [orderItems, setOrderItems] = useState([])

    const fetchOrderItemData = () =>  {
        fetch("/api/TakeoutOrder/GetAll")
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
            <div>
              <h1 className="text-center text-xl font-bold">Current Delivery Orders</h1>

              {/* Item has properties: id, name, price */}
              <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>

                        {/* maps the orderItem api data into the table*/}
                        {orderItems.map((orderItem) => (
                            <tr key={orderItem.id} className="hover">
                                <th>{orderItem.id}</th>
                                <td>{orderItem.name}</td>
                                <td>{orderItem.price}</td>
                            </tr>

                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center">
                        <button className="btn btn-info" type="button" onClick={fetchOrderItemData}>Refresh Menu Items</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeliveryOrders