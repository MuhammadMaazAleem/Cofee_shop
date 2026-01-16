import { useGetAllOrdersQuery, useUpdateOrderToPaidMutation, useUpdateOrderToDeliveredMutation } from '../../slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, Eye, DollarSign, Truck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminOrders = () => {
    const { data: orders, isLoading, refetch } = useGetAllOrdersQuery({});
    const [updateOrderToPaid] = useUpdateOrderToPaidMutation();
    const [updateOrderToDelivered] = useUpdateOrderToDeliveredMutation();

    const markAsPaidHandler = async (id: string) => {
        if (window.confirm('Mark this order as paid?')) {
            try {
                await updateOrderToPaid(id).unwrap();
                toast.success('Order marked as paid!');
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || 'Failed to update order');
            }
        }
    };

    const markAsDeliveredHandler = async (id: string) => {
        if (window.confirm('Mark this order as delivered?')) {
            try {
                await updateOrderToDelivered(id).unwrap();
                toast.success('Order marked as delivered!');
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || 'Failed to update order');
            }
        }
    };

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    return (
        <div className="pt-24 pb-12 bg-gradient-to-br from-secondary-latte via-white to-secondary-latte min-h-screen">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-2">Order Management</h1>
                    <p className="text-gray-600">Track and manage all customer orders</p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-primary-brown to-primary-espresso text-primary-cream">
                                <tr>
                                    <th className="text-left py-5 px-6 font-bold">Order ID</th>
                                    <th className="text-left py-5 px-6 font-bold">Customer</th>
                                    <th className="text-left py-5 px-6 font-bold">Date</th>
                                    <th className="text-left py-5 px-6 font-bold">Total</th>
                                    <th className="text-left py-5 px-6 font-bold">Payment</th>
                                    <th className="text-left py-5 px-6 font-bold">Delivery</th>
                                    <th className="text-left py-5 px-6 font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order: any, index: number) => (
                                    <tr key={order._id} className={`border-b hover:bg-gradient-to-r hover:from-accent-gold/5 hover:to-transparent transition-all ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2">
                                                <Package className="text-accent-gold" size={20} />
                                                <span className="font-mono text-sm font-bold text-primary-espresso">#{order._id.slice(-8)}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div>
                                                <p className="font-bold text-primary-espresso">{order.user?.name || 'N/A'}</p>
                                                <p className="text-xs text-gray-500">{order.user?.email || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-5 px-6">
                                            <span className="font-bold text-xl text-green-600">Rs. {order.totalPrice}</span>
                                        </td>
                                        <td className="py-5 px-6">
                                            {order.isPaid ? (
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300">
                                                    <CheckCircle size={16} />
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => markAsPaidHandler(order._id)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border border-yellow-300 hover:from-yellow-200 hover:to-yellow-300 transition-all"
                                                >
                                                    <Clock size={16} />
                                                    Mark Paid
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-5 px-6">
                                            {order.isDelivered ? (
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300">
                                                    <CheckCircle size={16} />
                                                    Delivered
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => markAsDeliveredHandler(order._id)}
                                                    disabled={!order.isPaid}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300 hover:from-blue-200 hover:to-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title={!order.isPaid ? 'Order must be paid first' : 'Mark as delivered'}
                                                >
                                                    <Truck size={16} />
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex gap-2">
                                                <Link to={`/order/${order._id}`}>
                                                    <button className="p-2.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 rounded-lg hover:from-purple-200 hover:to-purple-300 transition-all shadow-sm hover:shadow-md">
                                                        <Eye size={18} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <Link to="/admin" className="text-accent-gold font-bold hover:text-accent-mocha transition-colors flex items-center gap-2">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex gap-6">
                        <p className="text-gray-600">Total Orders: <span className="font-bold text-primary-espresso">{orders?.length || 0}</span></p>
                        <p className="text-gray-600">Paid: <span className="font-bold text-green-600">{orders?.filter((o: any) => o.isPaid).length || 0}</span></p>
                        <p className="text-gray-600">Delivered: <span className="font-bold text-blue-600">{orders?.filter((o: any) => o.isDelivered).length || 0}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
