import { useEffect, useState } from 'react';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, CreditCard, Wallet } from 'lucide-react';

const AdminDashboard = () => {
    const { data: orders, isLoading: ordersLoading } = useGetMyOrdersQuery({});
    const { data: products, isLoading: productsLoading } = useGetProductsQuery({});
    const { data: users, isLoading: usersLoading } = useGetUsersQuery({});
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalCustomers: 0,
    });

    useEffect(() => {
        if (orders && products && users) {
            const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.totalPrice, 0);
            setStats({
                totalOrders: orders.length,
                totalRevenue,
                totalProducts: products.length,
                totalCustomers: users.length,
            });
        }
    }, [orders, products, users]);

    if (ordersLoading || productsLoading || usersLoading) {
        return <div className="pt-32 text-center">Loading...</div>;
    }

    return (
        <div className="pt-24 pb-12 bg-gradient-to-br from-secondary-latte via-white to-secondary-latte min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-10">
                    <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-primary-espresso to-primary-brown bg-clip-text text-transparent mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your store.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <Package size={28} />
                            </div>
                            <TrendingUp className="text-white/80" size={24} />
                        </div>
                        <h3 className="text-white/80 text-sm mb-1 font-medium">Total Orders</h3>
                        <p className="text-4xl font-bold">{stats.totalOrders}</p>
                    </div>

                     <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <DollarSign size={28} />
                            </div>
                            <TrendingUp className="text-white/80" size={24} />
                        </div>
                        <h3 className="text-white/80 text-sm mb-1 font-medium">Total Revenue</h3>
                        <p className="text-4xl font-bold">Rs. {stats.totalRevenue.toFixed(0)}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <ShoppingBag size={28} />
                            </div>
                        </div>
                        <h3 className="text-white/80 text-sm mb-1 font-medium">Total Products</h3>
                        <p className="text-4xl font-bold">{stats.totalProducts}</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <Users size={28} />
                            </div>
                        </div>
                        <h3 className="text-white/80 text-sm mb-1 font-medium">Total Customers</h3>
                        <p className="text-4xl font-bold">{stats.totalCustomers}</p>
                    </div>
                </div>

                {/* Payment Accounts Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border-2 border-green-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-green-600 p-4 rounded-xl">
                                <Wallet className="text-white" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-900">EasyPaisa</h3>
                                <p className="text-green-600 text-sm">Primary Account</p>
                            </div>
                        </div>
                        <div className="space-y-3 bg-white/60 p-4 rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Account:</span>
                                <span className="font-bold text-green-900">0300-1234567</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Name:</span>
                                <span className="font-bold text-green-900">M. Ahmed</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Status:</span>
                                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg border-2 border-red-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-red-600 p-4 rounded-xl">
                                <Wallet className="text-white" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-red-900">JazzCash</h3>
                                <p className="text-red-600 text-sm">Secondary Account</p>
                            </div>
                        </div>
                        <div className="space-y-3 bg-white/60 p-4 rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Account:</span>
                                <span className="font-bold text-red-900">0301-7654321</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Name:</span>
                                <span className="font-bold text-red-900">Sara Khan</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Status:</span>
                                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border-2 border-blue-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-blue-600 p-4 rounded-xl">
                                <Wallet className="text-white" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-blue-900">NayaPay</h3>
                                <p className="text-blue-600 text-sm">Business Wallet</p>
                            </div>
                        </div>
                        <div className="space-y-3 bg-white/60 p-4 rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Account:</span>
                                <span className="font-bold text-blue-900">0312-9876543</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Name:</span>
                                <span className="font-bold text-blue-900">Coffee Shop</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Status:</span>
                                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Link to="/admin/products" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-accent-gold">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-accent-gold to-accent-mocha p-4 rounded-xl group-hover:scale-110 transition-transform">
                                <ShoppingBag className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-espresso">Manage Products</h3>
                        </div>
                        <p className="text-gray-600">Add, edit, or remove products from your catalog</p>
                    </Link>

                    <Link to="/admin/orders" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-accent-gold">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                <Package className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-espresso">Manage Orders</h3>
                        </div>
                        <p className="text-gray-600">View and update order statuses</p>
                    </Link>

                    <Link to="/admin/users" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-accent-gold">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                <Users className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-espresso">Manage Users</h3>
                        </div>
                        <p className="text-gray-600">View and manage customer accounts</p>
                    </Link>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-primary-espresso mb-6 flex items-center gap-3">
                        <Package className="text-accent-gold" />
                        Recent Orders
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Order ID</th>
                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Date</th>
                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Total</th>
                                    <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.slice(0, 5).map((order: any) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 font-mono text-sm text-gray-700">#{order._id.slice(-8)}</td>
                                        <td className="py-4 px-4 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 px-4 font-bold text-green-600">Rs. {order.totalPrice}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                                                order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
