
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Placeholder Pages (Moved Home to separate component if needed, but keeping inline for now)
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Origin from './pages/Origin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import OrderSuccess from './pages/OrderSuccess';

const Home = () => (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-secondary-latte overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-brown/10 rounded-l-full blur-3xl transform translate-x-20"></div>
           <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent-gold/10 rounded-r-full blur-3xl transform -translate-x-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
             <span className="inline-block py-1 px-3 rounded-full bg-accent-gold/20 text-accent-mocha font-bold tracking-wider text-sm uppercase">
               Premium Coffee Roasters
             </span>
             <h1 className="text-6xl md:text-7xl font-serif font-bold text-primary-espresso leading-tight">
               Savor the <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-brown to-accent-gold">Art of Coffee</span>
             </h1>
             <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
               Experience the rich, bold flavors of our ethically sourced beans, brewed to perfection for your morning ritual.
             </p>
             <div className="flex gap-4">
               <Link to="/shop">
                 <button className="px-8 py-4 bg-primary-espresso text-primary-cream font-bold rounded-full hover:bg-primary-brown transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                   Order Now
                 </button>
               </Link>
               <Link to="/shop">
                 <button className="px-8 py-4 border-2 border-primary-espresso text-primary-espresso font-bold rounded-full hover:bg-primary-espresso hover:text-white transition-all">
                   View Menu
                 </button>
               </Link>
             </div>
             
             <div className="flex items-center gap-8 pt-8">
                <div>
                  <p className="text-3xl font-bold text-primary-brown">15k+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <p className="text-3xl font-bold text-primary-brown">100%</p>
                  <p className="text-sm text-gray-500">Organic Beans</p>
                </div>
             </div>
          </div>
          
          {/* Hero Image Area placeholder */}
          <div className="relative">
             <div className="aspect-square rounded-full bg-gradient-to-br from-primary-brown to-primary-espresso p-2 shadow-2xl animate-spin-slow" style={{ animationDuration: '60s' }}>
                <div className="w-full h-full rounded-full bg-secondary-latte flex items-center justify-center border-8 border-white/10 relative overflow-hidden">
                   <img 
                     src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                     alt="Coffee Cup" 
                     className="w-[120%] h-[120%] object-cover object-center transform -translate-y-4"
                   />
                </div>
             </div>
             
             {/* Floating Cards */}
             <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  ⭐
                </div>
                <div>
                  <p className="text-xs text-gray-500">Best Quality</p>
                  <p className="font-bold text-sm text-primary-espresso">5 Star Rating</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
  
  function App() {
    return (
      <Router>
        <div className="min-h-screen bg-secondary-latte text-primary-espresso font-sans">
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/origin" element={<Origin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/order/:id" element={<OrderSuccess />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route path="/admin/products/edit/:id" element={<EditProduct />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Routes>
          <Footer />
        </div>
      </Router>
    );
  }

export default App;
