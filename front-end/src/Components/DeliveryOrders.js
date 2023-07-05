import React from 'react'
import {
    useState, 
    useEffect
} from 'react'


function DeliveryOrders() {

    const [deliveryOrders, setDeliveryOrders] = useState([])

    const [deliveryData, setDeliveryData] = useState({
        customerName: '',
        address: '',
        orderItems: [],
        subtotal: 0,
    });

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        setDeliveryData((prevData) => {
          const updatedOrderItems = [...prevData.orderItems];
          updatedOrderItems[index] = { ...updatedOrderItems[index], [name]: value };
          return { ...prevData, orderItems: updatedOrderItems };
        });
    };
      

    const handleOrderItemChange = (index, event) => {
        const { name, value } = event.target;
        const updatedOrderItems = [...deliveryData.orderItems];
        updatedOrderItems[index][name] = value;
        setDeliveryData((prevData) => ({
          ...prevData,
          orderItems: updatedOrderItems,
        }));
    };

    // adds a line to allow another item to be entered
    const handleAddOrderItem = () => {
        setDeliveryData((prevData) => ({
          ...prevData,
          orderItems: [...prevData.orderItems, { itemName: '', price: 0 }],
        }));
    };

    const handleRemoveOrderItem = (index) => {
        const updatedOrderItems = [...deliveryData.orderItems];
        updatedOrderItems.splice(index, 1);
        setDeliveryData((prevData) => ({
          ...prevData,
          orderItems: updatedOrderItems,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedDeliveryData = { ...deliveryData, orderItems: deliveryData.orderItems.filter(orderItem => orderItem.itemName !== '' && orderItem.price !== '') };
    
        try {
          const response = await fetch('api/DeliveryOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliveryData),
          });
    
          if (response.ok) {
            // Handle successful response
            console.log('Delivery order submitted successfully');
            // Reset form or perform other actions
          } else {
            // Handle error response
            console.error('Error submitting delivery order:', response.status);
          }
        } catch (error) {
          console.error('Error submitting delivery order:', error);
        }
    };

    // used to perform GET on the api
    const fetchDeliveryOrderData = () =>  {
        fetch("/api/DeliveryOrder/GetAll")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setDeliveryOrders(data)
        })
    }

    useEffect(() => {
        fetchDeliveryOrderData()
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
                            <th>Address</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>

                        {/* maps the orderItem api data into the table*/}
                        {deliveryOrders.map((deliveryOrder) => (
                            <tr key={deliveryOrder.id} className="hover">
                                <th>{deliveryOrder.id}</th>
                                <td>{deliveryOrder.name}</td>
                                <td>{deliveryOrder.address}</td>
                                {/* <td>{orderItem.price}</td> */}
                            </tr>

                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center space-x-2">
                        <button className="btn btn-info" type="button" onClick={fetchDeliveryOrderData}>Refresh Menu Items</button>
                        {/* Open the modal using ID.showModal() method */}
                        <button className="btn btn-primary" onClick={()=>window.my_modal_1.showModal()}>Add Delivery Order</button>
                        <dialog id="my_modal_1" className="modal">
                            <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                                <h3 className="text-center font-bold text-lg">Add Delivery Order</h3>

                                <div className="flex flex-col space-y-4">
                                    <p className="text-md font-bold">Name For Order</p>
                                    <input type="text" id="name" name="name" value={deliveryData.customerName} onChange={handleInputChange} placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                    <p className="text-md font-bold">Address</p>
                                    <input type="text" id="address" name="address" value={deliveryData.address} onChange={handleInputChange} placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                    <div>
                                        <div className="divider"></div>
                                        <h2 className="text-lg font-bold text-center pb-4">Order Items</h2>
                                        {/* used for entering an indefinite amount of order items */}
                                        {deliveryData.orderItems.map((orderItem, index) => (
                                            <div key={index}>
                                                <div className="flow-root space-y-2">
                                                    <label className="text-md font-bold float-left px-4 py-4" for={`itemName-${index}`}>Item Name:</label>
                                                    <input type="text" id={`itemName-${index}`} name="itemName" className="input input-bordered input-info float-right w-full max-w-xs"
                                                        value={orderItem.itemName} onChange={(event) => handleOrderItemChange(index, event)} />
                                                </div>
                                                <div className="flow-root space-y-2">
                                                    <label className="text-md font-bold float-left px-4 py-4" htmlFor={`price-${index}`}>Price:</label>
                                                    <input
                                                    className="input input-bordered input-info float-right w-full max-w-xs inset-y-0 left-0"
                                                    type="text"
                                                    id={`price-${index}`}
                                                    name="price"
                                                    value={orderItem.price}
                                                    onChange={(event) => handleInputChange(event, index)}
                                                    />
                                                </div>
                                                <div className="divider"></ div>
                                            </div>
                                        ))}

                                        <div className="flex flex-row justify-center space-x-2">
                                            <button type="btn" className="btn btn-sm btn-info" onClick={handleAddOrderItem}>Add Item</button>
                                            <button type="button" className="btn btn-sm btn-error" onClick={handleRemoveOrderItem}>Remove Item</button>
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-action flex justify-center">
                                    <button type="submit" className="btn btn-primary btn-wide">Add Order</button>
                                </div>
                                <p className="text-center font-bold pt-2">Use ESC key to exit</p> 
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeliveryOrders