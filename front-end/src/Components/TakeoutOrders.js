import React from 'react'
import {
    useState, 
    useEffect
} from 'react'


function TakeoutOrders() {

    const [takeoutOrders, setTakeoutOrders] = useState([])

    const [takeoutData, setTakeoutData] = useState({
        name: '',
        orderItems: [],
        subtotal: 0,
    });

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        setTakeoutData((prevData) => ({
            ...prevData, 
            [name]: value,
        }))
    }

    const handleNameChange = (event) => {
        const {value} = event.target;
        setTakeoutData((prevData) =>  ({
            ...prevData, 
            name: value,
        }));
    }

    const handleOrderItemChange = (index, event) => {
        const { name, value } = event.target;
        const updatedOrderItems = [...takeoutData.orderItems];
        updatedOrderItems[index][name] = value;
        setTakeoutData((prevData) => ({
          ...prevData,
          orderItems: updatedOrderItems,
        }));
    };

    // adds a line to allow another item to be entered
    const handleAddOrderItem = () => {
        setTakeoutData((prevData) => ({
          ...prevData,
          orderItems: [...prevData.orderItems, { itemName: '', price: 0 }],
        }));
    };

    const handleRemoveOrderItem = (index) => {
        const updatedOrderItems = [...takeoutData.orderItems];
        updatedOrderItems.splice(index, 1);
        setTakeoutData((prevData) => ({
          ...prevData,
          orderItems: updatedOrderItems,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedDeliveryData = { ...takeoutData, orderItems: takeoutData.orderItems.filter(orderItem => orderItem.itemName !== '' && orderItem.price !== '') };
    
        try {
          const response = await fetch('api/TakeoutOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDeliveryData),
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

    const fetchTakeoutOrderData = () =>  {
        fetch("/api/TakeoutOrder/GetAll")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setTakeoutOrders(data)
        })
    }

    useEffect(() => {
        fetchTakeoutOrderData()
    }, [])

  return (
    <div className="card w-full bg-base-300 shadow-xl">
        <div className="card-body">
            <div>
              <h1 className="text-center text-xl font-bold">Current Takeout Orders</h1>
              <div className="divider"></div>

              {/* Item has properties: id, name, price */}
              <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>

                        {/* maps the orderItem api data into the table*/}
                        {takeoutOrders.map((takeoutOrder) => (
                            <tr key={takeoutOrder.id} className="hover">
                                <th>{takeoutOrder.id}</th>
                                <td>{takeoutOrder.name}</td>
                                <td>{takeoutOrder.subTotal}</td>
                            </tr>

                        ))}
                        </tbody>
                    </table>

                    <div className="divider"></div>
                    <div className="flex justify-center space-x-2 pt-2 pb-2">
                        <button className="btn btn-info w-52" type="button" onClick={fetchTakeoutOrderData}>Refresh Menu Items</button>
                        {/* Open the modal using ID.showModal() method */}
                        <button className="btn btn-primary w-52" onClick={()=>window.my_modal_5.showModal()}>Add Takeout Order</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg text-center">Add Takeout Order</h3>
                            <div className="divider"></div>

                            <div className="flex flex-col space-y-4">
                                <p className="texrt-md font-bold">Name For Order</p>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={takeoutData.name}
                                    onChange={handleNameChange}
                                    placeholder="Type Here"
                                    className="input input-bordered input-info w-full max-w-xs"
                                />
                                <div className="divider"></div>
                            </div>
                            <div>
                                <div className="divider"></div>
                                <h2 className="text-lg font-bold text-center pb-4">Order Items</h2>
                                {/* used for entering an indefinite amount of order items */}
                                {takeoutData.orderItems.map((orderItem, index) => (
                                    <div key={index}>
                                        <div className="flow-root space-y-2">
                                            <label className="text-md font-bold float-left px-4 py-4" for={`itemName-${index}`}>Item Name:</label>
                                            <input type="text" 
                                                id={`itemName-${index}`} 
                                                name="itemName" 
                                                className="input input-bordered input-info float-right w-full max-w-xs"
                                                value={orderItem.itemName} 
                                                onChange={(event) => handleOrderItemChange(index, event)} 
                                            />
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


                            
                            <div className="modal-action flex justify-center">
                            {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-primary btn-wide">Add Takeout Order</button>
                            </div>
                            <p className="font-bold text-center py-4">Press ESC key to close</p>
                        </form>
                        </dialog>

                        <div className="flex justify-center pt-2">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TakeoutOrders