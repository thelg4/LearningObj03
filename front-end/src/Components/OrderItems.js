import React from 'react'
import {
    useState, 
    useEffect
} from 'react'

function OrderItems() {

    const [orderItems, setOrderItems] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });
  
    const handleInputChange = (event) =>  {
      const {name, value} = event.target;
      setFormData((prevFormData) =>    ({
          ...prevFormData, 
          [name]: value,
      }));
    };
  
    // POST to the api
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // convert the price to an integer
      const priceInCents = parseInt(formData.price, 10);
  
      try {
          const response = await fetch('api/OrderItem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, price: priceInCents }),
          });
    
          if (response.ok) {
            // Handle successful response
            console.log('Data submitted successfully');
          } else {
            // Handle error response
            console.error('Error submitting data:', response.status);
          }
        } catch (error) {
          console.error('Error submitting data:', error);
        }
    };
    
  
    // GET from the api
    const fetchOrderItemData = () =>  {
      fetch("/api/OrderItem/GetAll")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setOrderItems(data)
        })
    }
  
  // refreshes the api data
    useEffect(() => {
      fetchOrderItemData()
    }, [])

  return (
    <div className="card w-full bg-base-300 shadow-xl">
        <div className="card-body">
            <div>
              <h1 className="text-center text-xl font-bold">Menu Items</h1>

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

                    <div className="flex justify-center space-x-2">
                        <button className="btn btn-info" type="button" onClick={fetchOrderItemData}>Refresh Menu Items</button>
                        {/* Open the modal using ID.showModal() method */}
                        <button className="btn btn-primary" onClick={()=>window.my_modal_2.showModal()}>Add Menu Item</button>
                        <dialog id="my_modal_2" className="modal">
                            <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                                <h3 className="text-center font-bold text-xl">Add Menu Item</h3>
                                    <div className="flex flex-col space-y-4">
                                        <p className="text-md font-bold">Menu Item Name</p>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                        <p className="text-md font-bold">Menu Item Price</p>
                                        <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                                    </div>

                                    <div className="flex justify-center pt-4">
                                        <button type="submit" className="btn btn-primary">Add Item</button>
                                    </div>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderItems