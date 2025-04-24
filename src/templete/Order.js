
import { Container } from "reactstrap";


const Order=()=>{

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <Container className="max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Order</h2>
                <p className="text-center text-gray-500">Your order has been placed successfully!</p>
            </Container>
        </div>
    )   
}


export default Order;