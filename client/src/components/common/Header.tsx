import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Coffee, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-brown/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-accent-gold p-2 rounded-full text-primary-espresso group-hover:scale-110 transition-transform">
            <Coffee size={24} strokeWidth={2.5} />
          </div>
          <span className={`text-2xl font-bold font-serif tracking-wide ${isScrolled ? 'text-primary-cream' : 'text-primary-espresso'}`}>
            Roasted
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Shop', 'Origin', 'Blog'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`font-medium text-sm text-lg tracking-wide hover:text-accent-gold transition-colors ${
                 isScrolled ? 'text-primary-cream' : 'text-primary-espresso'
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className={`hover:text-accent-gold transition-colors ${isScrolled ? 'text-primary-cream' : 'text-primary-espresso'}`}
          >
            <Search size={22} />
          </button>
          
          {userInfo ? (
             <div className="relative group/profile">
               <button className={`flex items-center gap-2 font-bold hover:text-accent-gold transition-colors ${isScrolled ? 'text-primary-cream' : 'text-primary-espresso'}`}>
                 <User size={22} />
                 <span>{userInfo.name.split(' ')[0]}</span>
               </button>
               {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 invisible group-hover/profile:visible opacity-0 group-hover/profile:opacity-100 transition-all transform origin-top-right z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold text-accent-gold">
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
             </div>
          ) : (
             <Link to="/login">
                <button className={`hover:text-accent-gold transition-colors ${isScrolled ? 'text-primary-cream' : 'text-primary-espresso'}`}>
                  <User size={22} />
                </button>
             </Link>
          )}

          <Link to="/cart">
            <button className={`relative hover:text-accent-gold transition-colors ${isScrolled ? 'text-primary-cream' : 'text-primary-espresso'}`}>
              <ShoppingBag size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-mocha text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)}
                </span>
              )}
            </button>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary-espresso"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 border-t-4 border-accent-gold"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for coffee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-full focus:border-accent-gold focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-gold text-primary-espresso p-3 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-primary-brown z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
             <button 
                className="absolute top-6 right-6 text-primary-cream"
                onClick={() => setIsMobileMenuOpen(false)}
             >
               <X size={32} />
             </button>
             {['Home', 'Shop', 'Origin', 'Blog'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-3xl font-bold text-primary-cream hover:text-accent-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
