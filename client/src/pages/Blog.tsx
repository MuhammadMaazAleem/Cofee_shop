import { Calendar, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'The Perfect Pour Over: A Step-by-Step Guide',
            excerpt: 'Master the art of pour over coffee with our comprehensive guide. Learn the techniques that professional baristas use.',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
            author: 'Sarah Johnson',
            date: 'January 5, 2026',
            readTime: '5 min read',
            category: 'Brewing',
        },
        {
            id: 2,
            title: 'Understanding Coffee Roast Levels',
            excerpt: 'From light to dark, discover how roast levels affect flavor profiles and which roast is perfect for your palate.',
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80',
            author: 'Michael Chen',
            date: 'December 28, 2025',
            readTime: '7 min read',
            category: 'Education',
        },
        {
            id: 3,
            title: 'Sustainable Coffee: Our Commitment to Farmers',
            excerpt: 'Learn about our direct trade relationships and how we ensure fair compensation for coffee farmers worldwide.',
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80',
            author: 'Emma Rodriguez',
            date: 'December 20, 2025',
            readTime: '6 min read',
            category: 'Sustainability',
        },
        {
            id: 4,
            title: 'Cold Brew vs Iced Coffee: What\'s the Difference?',
            excerpt: 'Uncover the key differences between cold brew and iced coffee, and learn which method produces the best results.',
            image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80',
            author: 'David Kim',
            date: 'December 15, 2025',
            readTime: '4 min read',
            category: 'Brewing',
        },
        {
            id: 5,
            title: 'The Science Behind Coffee Extraction',
            excerpt: 'Dive deep into the chemistry of coffee brewing and understand how extraction affects your cup.',
            image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80',
            author: 'Dr. Lisa Wang',
            date: 'December 10, 2025',
            readTime: '8 min read',
            category: 'Science',
        },
        {
            id: 6,
            title: 'Espresso Basics: Your Guide to the Perfect Shot',
            excerpt: 'Everything you need to know about pulling the perfect espresso shot at home.',
            image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80',
            author: 'Marco Rossi',
            date: 'December 5, 2025',
            readTime: '6 min read',
            category: 'Brewing',
        },
    ];

    return (
        <div className="pt-20 bg-secondary-latte min-h-screen">
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-espresso/80 to-primary-brown/70 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80" 
                    alt="Coffee Blog" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center text-white px-6">
                    <h1 className="text-6xl font-serif font-bold mb-4">Coffee Journal</h1>
                    <p className="text-xl max-w-2xl mx-auto">Stories, tips, and insights from the world of specialty coffee</p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group">
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-accent-gold px-3 py-1 rounded-full text-xs font-bold text-primary-espresso">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primary-espresso mb-3 line-clamp-2 group-hover:text-accent-gold transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                    
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Calendar size={14} />
                                            <span>{post.date}</span>
                                        </div>
                                        <Link to={`/blog/${post.id}`} className="text-accent-gold font-bold text-sm hover:underline">
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
