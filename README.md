# Advanced MERN Stack Coffee Shop E-Commerce Platform

A complete, production-ready coffee shop e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) featuring modern UI/UX, authentication, shopping cart, and order management.

## 🚀 Features

### Customer Features

- **Product Browsing**: Browse coffee products with filtering and sorting
- **Product Details**: Detailed product pages with images, descriptions, and reviews
- **Shopping Cart**: Add/remove items, adjust quantities, persistent cart storage
- **User Authentication**: Register, login, logout with JWT tokens
- **Checkout Process**: Complete order placement with shipping details
- **Order History**: View past orders and order details
- **Coffee Origins**: Learn about coffee-growing regions
- **Blog**: Coffee brewing tips, recipes, and educational content

### Admin Features (Backend Ready)

- **Order Management**: View and manage customer orders
- **Product Management**: CRUD operations for products
- **User Management**: View customer information

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Redux Toolkit** + RTK Query for state management
- **React Router v6** for navigation
- **React Hook Form** + Zod for form validation
- **Lucide React** for icons

### Backend

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
cd "d:/OneDrive/Desktop/cofee shop"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/coffeeshop
JWT_SECRET=your_jwt_secret_key_here
```

Seed the database with sample products:

```bash
node seed/seeder.js
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎨 Color Palette

- **Primary Brown**: #6F4E37
- **Cream**: #F5E6D3
- **Dark Espresso**: #3E2723
- **Caramel**: #C68642
- **Latte Foam**: #FDFAF6
- **Golden**: #D4AF37
- **Rich Mocha**: #4A2C2A
- **Fresh Mint**: #98D8C8

## 📁 Project Structure

```
cofee shop/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── slices/        # Redux slices
│   │   ├── store.ts       # Redux store
│   │   └── App.tsx        # Main app component
│   └── package.json
│
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── seed/             # Database seeding
│   └── index.js          # Server entry point
│
└── README.md
```

## 🔐 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Users

- `POST /api/users/login` - Login user
- `POST /api/users` - Register user

### Orders

- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)

## 🎯 Usage

1. **Browse Products**: Navigate to the Shop page to view all coffee products
2. **Add to Cart**: Click on a product and add it to your cart
3. **Register/Login**: Create an account or login
4. **Checkout**: Proceed to checkout and place your order
5. **View Orders**: Check your order history in your profile

## 🌟 Key Features Implemented

✅ Full-stack MERN architecture
✅ JWT authentication with protected routes
✅ Redux state management
✅ Responsive design with Tailwind CSS
✅ Shopping cart with localStorage persistence
✅ Order management system
✅ Beautiful UI with animations
✅ SEO-friendly pages
✅ Coffee origin information
✅ Blog section

## 🚧 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings
- Admin dashboard UI
- Email notifications
- Product search functionality
- Wishlist feature
- Social media integration

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using the MERN stack

---

**Note**: This is a complete, functional e-commerce platform ready for further customization and deployment.
