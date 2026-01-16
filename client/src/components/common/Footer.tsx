
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-espresso text-secondary-latte pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-accent-gold mb-6">Roasted</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Crafting the perfect cup of coffee from organic, fair-trade beans sourced from the world's finest growers.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-gold hover:text-primary-espresso transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-gold hover:text-primary-espresso transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-gold hover:text-primary-espresso transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {['Our Story', 'Menu', 'Subscription', 'Wholesale', 'Locations'].map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-accent-gold transition-colors block">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400">
              <MapPin className="text-accent-gold mt-1 flex-shrink-0" size={20} />
              <span>Plot 45-C, DHA Phase 6<br />Lahore, Pakistan</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Phone className="text-accent-gold flex-shrink-0" size={20} />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Mail className="text-accent-gold flex-shrink-0" size={20} />
              <span>hello@roastedcoffee.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
          <p className="text-gray-400 mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="flex flex-col gap-3">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
             />
             <button className="bg-accent-gold text-primary-espresso font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors uppercase tracking-wider text-sm">
               Subscribe
             </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Roasted Coffee Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
