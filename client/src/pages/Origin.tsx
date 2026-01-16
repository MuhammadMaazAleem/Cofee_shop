import { Coffee, MapPin, Users, Award } from 'lucide-react';

const Origin = () => {
    const origins = [
        {
            name: 'Ethiopia',
            region: 'Yirgacheffe',
            description: 'Known for its bright, floral notes with hints of citrus and berry. The birthplace of coffee.',
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80',
            altitude: '1,700-2,200m',
            process: 'Washed',
        },
        {
            name: 'Colombia',
            region: 'Huila',
            description: 'Rich, full-bodied flavor with caramel sweetness and balanced acidity.',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80',
            altitude: '1,500-2,000m',
            process: 'Washed',
        },
        {
            name: 'Indonesia',
            region: 'Sumatra',
            description: 'Earthy, herbal notes with heavy body and low acidity. Unique and bold.',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
            altitude: '1,100-1,600m',
            process: 'Wet-Hulled',
        },
    ];

    return (
        <div className="pt-20 bg-secondary-latte min-h-screen">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-espresso/90 to-primary-brown/80 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80" 
                    alt="Coffee Origin" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center text-white px-6">
                    <h1 className="text-6xl font-serif font-bold mb-4">Coffee Origins</h1>
                    <p className="text-xl max-w-2xl mx-auto">Journey through the world's finest coffee-growing regions</p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <MapPin className="mx-auto mb-4 text-accent-gold" size={40} />
                        <h3 className="text-3xl font-bold text-primary-espresso">12+</h3>
                        <p className="text-gray-600">Countries</p>
                    </div>
                    <div className="text-center">
                        <Coffee className="mx-auto mb-4 text-accent-gold" size={40} />
                        <h3 className="text-3xl font-bold text-primary-espresso">50+</h3>
                        <p className="text-gray-600">Farms</p>
                    </div>
                    <div className="text-center">
                        <Users className="mx-auto mb-4 text-accent-gold" size={40} />
                        <h3 className="text-3xl font-bold text-primary-espresso">100%</h3>
                        <p className="text-gray-600">Fair Trade</p>
                    </div>
                    <div className="text-center">
                        <Award className="mx-auto mb-4 text-accent-gold" size={40} />
                        <h3 className="text-3xl font-bold text-primary-espresso">Organic</h3>
                        <p className="text-gray-600">Certified</p>
                    </div>
                </div>
            </section>

            {/* Origins */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-serif font-bold text-primary-espresso mb-12 text-center">Our Coffee Regions</h2>
                    <div className="space-y-16">
                        {origins.map((origin, index) => (
                            <div key={origin.name} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                                    <img 
                                        src={origin.image} 
                                        alt={origin.name} 
                                        className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                    />
                                </div>
                                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                                    <h3 className="text-3xl font-bold text-primary-espresso mb-2">{origin.name}</h3>
                                    <p className="text-xl text-accent-gold mb-4">{origin.region}</p>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{origin.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-primary-brown">Altitude:</span>
                                            <span className="text-gray-600">{origin.altitude}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-primary-brown">Process:</span>
                                            <span className="text-gray-600">{origin.process}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Origin;
