# E-Commerce Platform

A complete full-stack e-commerce solution with separate client and admin dashboard applications, built with modern web technologies.

## 🏗️ Project Structure

```
E-Commerce/
├── client/          # Customer-facing e-commerce store
├── dashboard/       # Admin management dashboard
├── server/          # Backend API server
└── README.md        # This file
```

## 🚀 Features

### Client Application (Customer Store)
- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **Product Catalog** - Browse products with filtering and search
- **Shopping Cart** - Add/remove items with persistent cart state
- **User Authentication** - Login/register with secure sessions
- **Order Management** - Place orders and track order history
- **Profile Management** - Edit user profile and view order history
- **Responsive Design** - Works on desktop, tablet, and mobile
- **PWA Support** - Installable as a Progressive Web App

### Dashboard Application (Admin Panel)
- **Analytics Dashboard** - Sales metrics and user statistics
- **Product Management** - Add, edit, delete products with image uploads
- **User Management** - View and manage customer accounts
- **Admin Management** - Create and manage admin accounts with permissions
- **Order Tracking** - Monitor and manage customer orders
- **Real-time Updates** - Live data updates and notifications
- **Role-based Access** - Secure admin authentication and permissions

### Backend Server
- **RESTful API** - Complete API for all frontend operations
- **Authentication** - JWT-based auth with role management
- **Database** - PostgreSQL with Prisma ORM
- **File Upload** - Cloudinary integration for image storage
- **Payment Processing** - Stripe integration for payments
- **Email Notifications** - Automated email sending
- **Data Validation** - Comprehensive input validation

## 🛠️ Technology Stack

### Frontend (Client & Dashboard)
- **Next.js 14** - React framework with SSR/SSG
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Feather icons for UI elements
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client for API calls
- **SweetAlert2** - Beautiful alert dialogs
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side code
- **Prisma** - Database ORM and migrations
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud image storage and processing
- **Stripe** - Payment processing
- **Nodemailer** - Email sending

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Git** - Version control

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account (for image storage)
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd E-Commerce
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install dashboard dependencies
cd ../dashboard
npm install
```

### 3. Environment Setup

#### Server Environment (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
STRIPE_SECRET_KEY="your-stripe-secret-key"
EMAIL_USER="your-email"
EMAIL_PASS="your-email-password"
```

#### Client Environment (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

#### Dashboard Environment (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 4. Database Setup
```bash
cd server
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

### 5. Start Development Servers
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start client application
cd client
npm run dev

# Terminal 3: Start dashboard application
cd dashboard
npm run dev
```

## 🌐 Access Points

- **Client Store**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API Server**: http://localhost:5000

## 👤 Default Admin Account

```
Email: admin@example.com
Password: admin123
```

## 📱 Features Overview

### Client Store Features
- **Homepage** - Featured products and categories
- **Product Catalog** - Filter by category, price, size, color
- **Product Details** - Detailed product information with image gallery
- **Shopping Cart** - Persistent cart with quantity management
- **Checkout** - Secure payment processing with Stripe
- **User Account** - Profile management and order history
- **Search** - Product search with filters
- **Responsive Design** - Mobile-first approach

### Admin Dashboard Features
- **Analytics** - Sales charts, user statistics, revenue metrics
- **Products** - CRUD operations for product management
- **Users** - Customer account management
- **Admins** - Admin user management with permissions
- **Orders** - Order tracking and management
- **Settings** - Application configuration

### API Endpoints
- **Authentication** - Login, register, logout, password reset
- **Products** - CRUD operations, search, filtering
- **Users** - Profile management, order history
- **Orders** - Order creation, tracking, management
- **Payments** - Stripe payment processing
- **Analytics** - Sales and user statistics

## 🎨 Design System

### Color Scheme
- **Client**: Black and white theme with accent colors
- **Dashboard**: Blue theme (#3B82F6) for professional admin look

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Icons
- **Feather Icons** - Consistent iconography throughout
- **Custom Favicons** - T-shirt logo for client, grid pattern for dashboard

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Admin and user permissions
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Cross-origin request security
- **Password Hashing** - bcrypt for secure password storage
- **SQL Injection Protection** - Prisma ORM prevents SQL injection

## 📊 Database Schema

### Key Tables
- **Users** - Customer and admin accounts
- **Products** - Product catalog with variants
- **Orders** - Order management and tracking
- **Cart** - Shopping cart items
- **Categories** - Product categorization
- **Payments** - Payment transaction records

## 🚀 Deployment

### Production Build
```bash
# Build all applications
cd server && npm run build
cd ../client && npm run build
cd ../dashboard && npm run build
```

### Environment Variables
Ensure all production environment variables are set:
- Database connection string
- JWT secret
- Cloudinary credentials
- Stripe keys
- Email configuration

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: PostgreSQL on Railway, Supabase, or AWS RDS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Version History

- **v1.0.0** - Initial release with full e-commerce functionality
- **v1.1.0** - Added PWA support and improved mobile experience
- **v1.2.0** - Enhanced admin dashboard with analytics
- **v1.3.0** - Added real-time notifications and improved UI/UX

---

**Built with ❤️ using modern web technologies**