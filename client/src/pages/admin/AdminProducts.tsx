import { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminProducts = () => {
    const { data: products, isLoading, refetch } = useGetProductsQuery({});
    const [deleteProduct] = useDeleteProductMutation();
    const [showAddModal, setShowAddModal] = useState(false);

    const deleteHandler = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteProduct(id).unwrap();
                toast.success('Product deleted successfully!');
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || 'Failed to delete product');
            }
        }
    };

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    return (
        <div className="pt-24 pb-12 bg-secondary-latte min-h-screen">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary-espresso">Manage Products</h1>
                    <Link to="/admin/products/add">
                        <button className="bg-accent-gold text-primary-espresso px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2">
                            <Plus size={20} />
                            Add Product
                        </button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-primary-brown text-primary-cream">
                                <tr>
                                    <th className="text-left py-4 px-6">Image</th>
                                    <th className="text-left py-4 px-6">Name</th>
                                    <th className="text-left py-4 px-6">Category</th>
                                    <th className="text-left py-4 px-6">Price</th>
                                    <th className="text-left py-4 px-6">Stock</th>
                                    <th className="text-left py-4 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product: any) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                        </td>
                                        <td className="py-4 px-6 font-bold">{product.name}</td>
                                        <td className="py-4 px-6">{product.category}</td>
                                        <td className="py-4 px-6 font-bold text-primary-brown">Rs. {product.price}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                product.countInStock > 10 ? 'bg-green-100 text-green-700' : 
                                                product.countInStock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {product.countInStock} units
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <Link to={`/admin/products/edit/${product._id}`}>
                                                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>
                                                <button 
                                                    onClick={() => deleteHandler(product._id, product.name)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6">
                    <Link to="/admin" className="text-accent-gold font-bold hover:underline">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
