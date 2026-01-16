import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../slices/productsApiSlice';
import { ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AddProduct = () => {
    const navigate = useNavigate();
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Espresso',
        countInStock: '',
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct({
                ...formData,
                price: Number(formData.price),
                countInStock: Number(formData.countInStock),
            }).unwrap();
            toast.success('Product created successfully!');
            setTimeout(() => navigate('/admin/products'), 1500);
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create product');
        }
    };

    return (
        <div className="pt-24 pb-12 bg-secondary-latte min-h-screen">
            <Toaster position="top-right" />
            <div className="max-w-4xl mx-auto px-6">
                <button onClick={() => navigate('/admin/products')} className="inline-flex items-center gap-2 text-primary-espresso hover:text-accent-gold mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Products
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-serif font-bold text-primary-espresso mb-8">Add New Product</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                placeholder="Ethiopian Yirgacheffe"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs.)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    step="1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                    placeholder="1500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    name="countInStock"
                                    value={formData.countInStock}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                    placeholder="50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                            >
                                <option value="Espresso">Espresso</option>
                                <option value="Dark Roast">Dark Roast</option>
                                <option value="Medium Roast">Medium Roast</option>
                                <option value="Light Roast">Light Roast</option>
                                <option value="Blend">Blend</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold outline-none"
                                placeholder="Describe the coffee's flavor profile, origin, and characteristics..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent-gold text-primary-espresso py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Creating...' : 'Create Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
