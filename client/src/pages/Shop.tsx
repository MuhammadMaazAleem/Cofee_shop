import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useMemo, memo } from 'react';

// Memoized Product Card Component for better performance
const ProductCard = memo(({ product }: { product: any }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-primary-espresso">
        {product.category}
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
         <h3 className="text-xl font-bold text-primary-espresso">{product.name}</h3>
         <div className="flex items-center gap-1 text-accent-gold">
           <Star size={16} fill="currentColor" />
           <span className="text-sm font-medium">{product.rating}</span>
         </div>
      </div>
      
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary-brown">Rs. {product.price}</span>
        <Link to={`/product/${product._id}`}>
           <button className="bg-primary-espresso text-white p-3 rounded-full hover:bg-accent-gold hover:text-primary-espresso transition-colors">
             <ShoppingBag size={20} />
           </button>
        </Link>
      </div>
    </div>
  </div>
));

ProductCard.displayName = 'ProductCard';

const Shop = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({});
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery) return products;
    
    return products.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  if (isLoading) return <div className="pt-32 text-center text-primary-espresso">Loading...</div>;
  if (error) return <div className="pt-32 text-center text-red-500">Error loading products</div>;

  return (
    <div className="pt-24 pb-12 bg-secondary-latte min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-8 text-center">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Coffee Collection'}
        </h1>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">No products found</p>
            <Link to="/shop" className="text-accent-gold font-bold hover:underline">
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
