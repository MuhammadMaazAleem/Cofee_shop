import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state: any) => state.cart);

    const addToCartHandler = (item: any, qty: number) => {
        dispatch(addToCart({ ...item, qty }));
    };

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className="pt-28 pb-12 bg-secondary-latte min-h-screen">
             <div className="max-w-7xl mx-auto px-6">
                 <Link to="/shop" className="inline-flex items-center gap-2 text-primary-espresso hover:text-accent-gold mb-8 transition-colors">
                     <ArrowLeft size={20} /> Continue Shopping
                 </Link>

                 <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-8">Shopping Cart</h1>

                 {cartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                        <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
                        <Link to="/shop">
                            <button className="bg-primary-espresso text-white px-8 py-3 rounded-full font-bold hover:bg-primary-brown transition-colors">
                                Go to Shop
                            </button>
                        </Link>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                         {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item: any) => (
                                <div key={item._id} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                    
                                    <div className="flex-1">
                                        <Link to={`/product/${item._id}`} className="text-xl font-bold text-primary-espresso hover:text-accent-gold transition-colors">
                                           {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                    
                                    <div className="text-lg font-bold text-primary-brown">Rs. {item.price}</div>
                                    
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button 
                                          className="px-3 py-1 hover:bg-gray-100"
                                          onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                                        >-</button>
                                        <span className="px-3 py-1 font-medium">{item.qty}</span>
                                        <button 
                                          className="px-3 py-1 hover:bg-gray-100"
                                          onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                                          disabled={item.qty >= item.countInStock}
                                        >+</button>
                                    </div>
                                    
                                    <button 
                                       onClick={() => removeFromCartHandler(item._id)}
                                       className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Summary */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl h-fit">
                            <h2 className="text-2xl font-bold text-primary-espresso mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)} items)</span>
                                    <span className="font-bold">Rs. {itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-bold">Rs. {shippingPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (15%)</span>
                                    <span className="font-bold">Rs. {taxPrice}</span>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold text-primary-espresso">
                                    <span>Total</span>
                                    <span>Rs. {totalPrice}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={checkoutHandler}
                                className="w-full bg-accent-gold text-primary-espresso py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <CreditCard size={20} />
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                 )}
             </div>
        </div>
    );
};

export default Cart;
