# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. Environment Variables Setup
- [ ] **Client**: Create `.env.local` with production API URL
- [ ] **Dashboard**: Create `.env.local` with production API URL  
- [ ] **Server**: Create `.env` with production database and API keys
- [ ] **Stripe**: Use live keys (pk_live_ and sk_live_)
- [ ] **Cloudinary**: Verify production credentials
- [ ] **Email**: Configure production email settings

### 2. Domain Configuration
- [ ] **Client Domain**: `https://your-domain.com`
- [ ] **Dashboard Domain**: `https://admin.your-domain.com`
- [ ] **API Domain**: `https://api.your-domain.com`
- [ ] **SSL Certificates**: Valid for all domains
- [ ] **DNS Records**: Point all domains to VPS IP

### 3. Database Setup
- [ ] **PostgreSQL**: Running and accessible
- [ ] **Database**: Created with proper user permissions
- [ ] **Migrations**: All migrations applied
- [ ] **Seed Data**: Admin user created
- [ ] **Backup**: Initial backup created

### 4. Server Configuration
- [ ] **Nginx**: Configured with reverse proxy
- [ ] **PM2**: Process manager configured
- [ ] **Firewall**: Ports 80, 443 open
- [ ] **SSL**: Let's Encrypt certificates installed
- [ ] **Auto-renewal**: SSL renewal configured

## 🔧 Deployment Commands

### On VPS:
```bash
# Navigate to project
cd /var/www/ecommerce

# Pull latest changes
git pull origin main

# Install dependencies
cd server && npm install --production
cd ../client && npm install --production
cd ../dashboard && npm install --production

# Run migrations
cd ../server && npx prisma migrate deploy && npx prisma generate

# Build applications
cd ../client && npm run build
cd ../dashboard && npm run build

# Restart services
cd .. && pm2 restart all
```

## 📋 Environment Files

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
```

### Dashboard (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1
```

### Server (.env)
```env
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://ecommerce_user:password@localhost:5432/ecommerce"
JWT_SECRET="your-super-secure-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"
EMAIL_USER="your-email@domain.com"
EMAIL_PASS="your-email-password"
CORS_ORIGIN="https://your-domain.com,https://admin.your-domain.com"
```

## 🌐 Final URLs
- **Client Store**: https://your-domain.com
- **Admin Dashboard**: https://admin.your-domain.com
- **API Server**: https://api.your-domain.com

## 🔍 Post-Deployment Testing
- [ ] **Client**: Homepage loads correctly
- [ ] **Client**: Login/register works
- [ ] **Client**: Product browsing works
- [ ] **Client**: Cart functionality works
- [ ] **Dashboard**: Admin login works
- [ ] **Dashboard**: All pages load correctly
- [ ] **API**: All endpoints respond correctly
- [ ] **SSL**: All sites use HTTPS
- [ ] **Favicons**: Custom favicons display
- [ ] **PWA**: Apps can be installed

## 🚨 Troubleshooting
- **Check PM2 status**: `pm2 status`
- **Check logs**: `pm2 logs`
- **Check Nginx**: `sudo systemctl status nginx`
- **Check database**: `sudo systemctl status postgresql`
- **Test API**: `curl https://api.your-domain.com/api/v1/health`

## 📊 Monitoring
- **PM2 Monitoring**: `pm2 monit`
- **Nginx Logs**: `/var/log/nginx/`
- **Application Logs**: `pm2 logs`
- **Database Logs**: `/var/log/postgresql/`

---

**Ready for Production! 🎉**
