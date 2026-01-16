import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    
    const blogPosts: any = {
        '1': {
            title: 'The Perfect Pour Over: A Step-by-Step Guide',
            content: `
                <h2>Introduction to Pour Over Coffee</h2>
                <p>Pour over coffee is one of the most rewarding brewing methods for coffee enthusiasts. This manual brewing technique allows you to control every aspect of the extraction process, resulting in a clean, flavorful cup that highlights the unique characteristics of your beans.</p>
                
                <h2>What You'll Need</h2>
                <ul>
                    <li>Pour over dripper (V60, Chemex, or Kalita Wave)</li>
                    <li>Paper filters</li>
                    <li>Freshly roasted coffee beans</li>
                    <li>Burr grinder</li>
                    <li>Gooseneck kettle</li>
                    <li>Scale</li>
                    <li>Timer</li>
                </ul>
                
                <h2>Step-by-Step Instructions</h2>
                <h3>1. Heat Your Water</h3>
                <p>Bring water to 195-205°F (90-96°C). If you don't have a thermometer, let boiling water rest for 30 seconds.</p>
                
                <h3>2. Grind Your Coffee</h3>
                <p>Use a medium-fine grind, similar to sea salt. For a 12oz cup, use 20-22 grams of coffee.</p>
                
                <h3>3. Rinse the Filter</h3>
                <p>Place the filter in your dripper and rinse with hot water. This removes paper taste and preheats your vessel.</p>
                
                <h3>4. Add Coffee and Bloom</h3>
                <p>Add your ground coffee and create a small well in the center. Pour 40-50g of water in a circular motion, ensuring all grounds are saturated. Wait 30-45 seconds for the bloom.</p>
                
                <h3>5. Continue Pouring</h3>
                <p>Pour in slow, steady circles from the center outward, maintaining a consistent water level. Total brew time should be 2.5-3.5 minutes.</p>
                
                <h2>Pro Tips</h2>
                <p>Experiment with grind size, water temperature, and pour technique to find your perfect cup. Keep notes on what works best for different beans!</p>
            `,
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
            author: 'Sarah Johnson',
            date: 'January 5, 2026',
            readTime: '5 min read',
            category: 'Brewing',
        },
        '2': {
            title: 'Understanding Coffee Roast Levels',
            content: `
                <h2>The Art and Science of Coffee Roasting</h2>
                <p>Coffee roasting is a transformative process that turns green coffee beans into the aromatic brown beans we know and love. Understanding roast levels helps you choose the perfect coffee for your taste preferences.</p>
                
                <h2>Light Roast</h2>
                <p>Light roasts are roasted for the shortest time and reach an internal temperature of 356-401°F. These beans are light brown with no oil on the surface.</p>
                <ul>
                    <li>Flavor Profile: Bright, acidic, complex</li>
                    <li>Best For: Single-origin coffees, pour over, drip</li>
                    <li>Caffeine: Highest caffeine content</li>
                </ul>
                
                <h2>Medium Roast</h2>
                <p>Medium roasts are the most popular in America. They're roasted to 410-428°F and have a balanced flavor profile.</p>
                <ul>
                    <li>Flavor Profile: Balanced acidity and body</li>
                    <li>Best For: Drip coffee, French press</li>
                    <li>Caffeine: Moderate caffeine content</li>
                </ul>
                
                <h2>Dark Roast</h2>
                <p>Dark roasts are roasted to 437-446°F. The beans are dark brown to nearly black with a shiny, oily surface.</p>
                <ul>
                    <li>Flavor Profile: Bold, smoky, less acidic</li>
                    <li>Best For: Espresso, cold brew</li>
                    <li>Caffeine: Lowest caffeine content</li>
                </ul>
                
                <h2>Finding Your Perfect Roast</h2>
                <p>Start with medium roast and experiment from there. Pay attention to how different roasts affect the flavor of your favorite brewing method.</p>
            `,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80',
            author: 'Michael Chen',
            date: 'December 28, 2025',
            readTime: '7 min read',
            category: 'Education',
        },
        '3': {
            title: 'Sustainable Coffee: Our Commitment to Farmers',
            content: `
                <h2>Building Direct Relationships</h2>
                <p>At Roasted Coffee Co., we believe in fair compensation and sustainable practices. Our direct trade relationships ensure farmers receive fair prices while maintaining quality.</p>
                
                <h2>What is Direct Trade?</h2>
                <p>Direct trade means we work directly with farmers, cutting out middlemen. This ensures:</p>
                <ul>
                    <li>Higher prices for farmers</li>
                    <li>Better quality control</li>
                    <li>Long-term relationships</li>
                    <li>Transparency in the supply chain</li>
                </ul>
                
                <h2>Environmental Impact</h2>
                <p>We partner with farms that use sustainable growing practices including shade-grown coffee, organic farming, and water conservation.</p>
                
                <h2>Community Development</h2>
                <p>A portion of every purchase goes toward community development projects in coffee-growing regions, including schools, healthcare, and infrastructure.</p>
            `,
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80',
            author: 'Emma Rodriguez',
            date: 'December 20, 2025',
            readTime: '6 min read',
            category: 'Sustainability',
        },
    };

    const post = blogPosts[id || '1'];

    if (!post) {
        return (
            <div className="pt-32 pb-12 bg-secondary-latte min-h-screen">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-primary-espresso mb-4">Article Not Found</h1>
                    <Link to="/blog" className="text-accent-gold font-bold hover:underline">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 pb-12 bg-secondary-latte min-h-screen">
            <article className="max-w-4xl mx-auto px-6 py-12">
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary-espresso hover:text-accent-gold mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Blog
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
                    
                    <div className="p-8 md:p-12">
                        <div className="mb-6">
                            <span className="inline-block bg-accent-gold/20 text-accent-mocha px-4 py-2 rounded-full text-sm font-bold">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-espresso mb-6">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <div 
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            style={{
                                lineHeight: '1.8',
                            }}
                        />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
