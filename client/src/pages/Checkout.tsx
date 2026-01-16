import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCart } from '../slices/cartSlice';
import { ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart);
    const { userInfo } = useSelector((state: any) => state.auth);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('EasyPaisa');

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const dummyAccounts: Record<string, string> = {
        'EasyPaisa': '0300-1234567 (Muhammad Ahmed)',
        'JazzCash': '0301-7654321 (Sara Khan)',
        'NayaPay': '0312-9876543 (Coffee Shop Official)',
        'Bank Transfer': 'HBL Main Boulevard Branch - Acc: 1234-5678-9012-3456',
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/checkout');
        }
        if (cart.cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate, userInfo]);

    const placeOrderHandler = async () => {
        if (!address || !city || !postalCode || !country) {
            toast.error('Please fill in all shipping address fields');
            return;
        }

        try {
            toast.loading('Placing your order...');
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: {
                    address,
                    city,
                    postalCode,
                    country,
                },
                paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            
            toast.dismiss();
            toast.success('Order placed successfully! 🎉');
            
            // Clear cart after successful order
            dispatch(clearCart());
            setTimeout(() => navigate(`/order/${res._id}`), 1500);
        } catch (err: any) {
            toast.dismiss();
            console.error('Order error:', err);
            toast.error(err?.data?.message || err?.message || 'Failed to place order. Please try again.');
        }
    };

    return (
        <div className="pt-28 pb-12 bg-secondary-latte min-h-screen">
            <Toaster position="top-right" />
            <div className="max-w-5xl mx-auto px-6">
                <button onClick={() => navigate('/cart')} className="inline-flex items-center gap-2 text-primary-espresso hover:text-accent-gold mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Cart
                </button>

                <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-primary-espresso mb-4">Shipping Address</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none bg-white"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">Select Country</option>
                                    <option value="Pakistan">Pakistan</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-primary-espresso mb-4">Payment Method</h2>
                            <div className="space-y-4">
                                {Object.keys(dummyAccounts).map((method) => (
                                    <div key={method} className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === method ? 'border-accent-gold bg-yellow-50' : 'border-gray-100'}`} onClick={() => setPaymentMethod(method)}>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value={method}
                                                checked={paymentMethod === method}
                                                onChange={() => setPaymentMethod(method)}
                                                className="w-4 h-4 text-accent-gold"
                                            />
                                            <span className="font-bold text-primary-espresso">{method}</span>
                                        </div>
                                        {paymentMethod === method && (
                                            <div className="mt-3 p-3 bg-white rounded-lg border border-yellow-200 text-sm">
                                                <p className="text-gray-600 mb-1">Send payment to:</p>
                                                <p className="font-mono font-bold text-primary-espresso select-all">{dummyAccounts[method]}</p>
                                                <p className="mt-1 text-xs text-gray-400 italic">* Please share screenshot of transaction at checkout/WhatsApp</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-xl h-fit">
                        <h2 className="text-2xl font-bold text-primary-espresso mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span>Items</span>
                                <span className="font-medium">Rs. {cart.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium">Rs. {cart.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="font-medium">Rs. {cart.taxPrice}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary-brown">Rs. {cart.totalPrice}</span>
                            </div>
                        </div>
                        <button
                            onClick={placeOrderHandler}
                            disabled={isLoading || !address || !city || !postalCode || !country}
                            className="w-full bg-accent-gold text-primary-espresso py-4 rounded-xl font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
