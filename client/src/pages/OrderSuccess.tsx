import { useParams, Link } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { CheckCircle, Package, MapPin, CreditCard } from 'lucide-react';

const OrderSuccess = () => {
    const { id } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

    if (isLoading) return <div className="pt-32 text-center">Loading order details...</div>;
    if (error) return <div className="pt-32 text-center text-red-500">Error loading order</div>;

    return (
        <div className="pt-24 pb-12 bg-secondary-latte min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                {/* Success Message */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
                    <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                    <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-4">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-600 mb-2">Thank you for your order</p>
                    <p className="text-sm text-gray-500">Order ID: {order?._id}</p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-primary-espresso mb-6">Order Details</h2>
                    
                    {/* Shipping Address */}
                    <div className="mb-6 pb-6 border-b">
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin className="text-accent-gold" size={20} />
                            <h3 className="font-bold text-lg">Shipping Address</h3>
                        </div>
                        <p className="text-gray-600">
                            {order?.shippingAddress.address}<br />
                            {order?.shippingAddress.city}, {order?.shippingAddress.postalCode}<br />
                            {order?.shippingAddress.country}
                        </p>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6 pb-6 border-b">
                        <div className="flex items-center gap-2 mb-3">
                            <CreditCard className="text-accent-gold" size={20} />
                            <h3 className="font-bold text-lg">Payment Method</h3>
                        </div>
                        <p className="text-gray-600">{order?.paymentMethod}</p>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="text-accent-gold" size={20} />
                            <h3 className="font-bold text-lg">Order Items</h3>
                        </div>
                        <div className="space-y-4">
                            {order?.orderItems.map((item: any, index: number) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-primary-espresso">{item.name}</h4>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <p className="font-bold text-primary-brown">Rs. {(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Items</span>
                                <span>Rs. {order?.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Rs. {order?.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>Rs. {order?.taxPrice}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary-brown">Rs. {order?.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <Link to="/shop">
                        <button className="px-8 py-3 bg-primary-espresso text-white rounded-lg font-bold hover:bg-primary-brown transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="px-8 py-3 border-2 border-primary-espresso text-primary-espresso rounded-lg font-bold hover:bg-primary-espresso hover:text-white transition-colors">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
