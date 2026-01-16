import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { Star, ShoppingBag, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (isLoading) return <div className="pt-32 text-center">Loading...</div>;
  if (error) return <div className="pt-32 text-center text-red-500">Error loading product</div>;

  return (
    <div className="pt-28 pb-12 bg-secondary-latte min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-primary-espresso hover:text-accent-gold mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl p-8 shadow-xl">
           {/* Image Section */}
           <div className="relative">
             <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover"
               />
             </div>
           </div>

           {/* Info Section */}
           <div className="flex flex-col justify-center">
             <div className="mb-2">
               <span className="text-accent-mocha font-bold tracking-wider text-sm uppercase bg-accent-gold/20 px-3 py-1 rounded-full">
                 {product.category}
               </span>
             </div>
             
             <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-4">{product.name}</h1>
             
             <div className="flex items-center gap-4 mb-6">
               <div className="flex text-accent-gold">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
                 ))}
               </div>
               <span className="text-gray-500 text-sm">({product.numReviews} Reviews)</span>
               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
               <span className={`text-sm font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                 {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
               </span>
             </div>

             <p className="text-gray-600 text-lg leading-relaxed mb-8">
               {product.description}
             </p>

             <div className="h-px w-full bg-gray-100 mb-8"></div>

             <div className="flex items-center gap-8 mb-8">
               <span className="text-4xl font-bold text-primary-brown">Rs. {product.price}</span>
               
               <div className="flex items-center border-2 border-primary-espresso rounded-full px-4 py-2">
                 <button 
                  className="w-8 h-8 flex items-center justify-center text-xl font-bold text-primary-espresso hover:text-accent-gold"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={product.countInStock === 0}
                 >-</button>
                 <span className="w-12 text-center text-lg font-bold">{qty}</span>
                 <button 
                  className="w-8 h-8 flex items-center justify-center text-xl font-bold text-primary-espresso hover:text-accent-gold"
                  onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                  disabled={product.countInStock === 0}
                 >+</button>
               </div>
             </div>

             <div className="flex gap-4 mb-8">
               <button 
                 className="flex-1 bg-primary-espresso text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-brown transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                 disabled={product.countInStock === 0}
                 onClick={addToCartHandler}
               >
                 <ShoppingBag size={24} />
                 Add to Cart
               </button>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 text-sm text-gray-500">
                 <Truck size={20} className="text-accent-gold" />
                 <span>Free delivery over Rs. 2000</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-500">
                 <ShieldCheck size={20} className="text-accent-gold" />
                 <span>Quality Guarantee</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
