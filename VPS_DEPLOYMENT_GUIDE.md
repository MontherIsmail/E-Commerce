# 🚀 VPS Deployment Guide for E-Commerce Platform

## 📋 Prerequisites

- VPS with Ubuntu 20.04+ or similar Linux distribution
- Domain names configured (e.g., `your-domain.com`, `admin.your-domain.com`, `api.your-domain.com`)
- Root or sudo access to the VPS
- Basic knowledge of Linux commands

## 🔧 VPS Setup

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js (v18+)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 4. Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. Install PM2
```bash
sudo npm install -g pm2
```

### 6. Install Certbot (for SSL)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

## 🗄️ Database Setup

### 1. Create Database and User
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE ecommerce;
CREATE USER ecommerce_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO ecommerce_user;
\q
```

### 2. Configure PostgreSQL
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```
Uncomment and set:
```
listen_addresses = 'localhost'
```

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```
Add:
```
local   all             ecommerce_user                    md5
```

```bash
sudo systemctl restart postgresql
```

## 📁 Project Setup

### 1. Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/your-username/E-Commerce.git
sudo chown -R $USER:$USER E-Commerce
cd E-Commerce
```

### 2. Install Dependencies
```bash
cd server && npm install --production
cd ../client && npm install --production
cd ../dashboard && npm install --production
```

### 3. Environment Configuration

#### Server (.env)
```bash
cd ../server
nano .env
```

```env
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://ecommerce_user:your_secure_password@localhost:5432/ecommerce"
JWT_SECRET="your-super-secure-jwt-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"
EMAIL_USER="your-email@domain.com"
EMAIL_PASS="your-email-password"
CORS_ORIGIN="https://your-domain.com,https://admin.your-domain.com"
```

#### Client (.env.local)
```bash
cd ../client
nano .env.local
```

```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

#### Dashboard (.env.local)
```bash
cd ../dashboard
nano .env.local
```

```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1
```

### 4. Database Migration
```bash
cd ../server
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

### 5. Build Applications
```bash
cd ../client && npm run build
cd ../dashboard && npm run build
```

## 🌐 Nginx Configuration

### 1. Create Nginx Configurations

#### Client Site
```bash
sudo nano /etc/nginx/sites-available/ecommerce-client
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/E-Commerce/client/out;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /_next/static/ {
        alias /var/www/E-Commerce/client/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Dashboard Site
```bash
sudo nano /etc/nginx/sites-available/ecommerce-dashboard
```

```nginx
server {
    listen 80;
    server_name admin.your-domain.com;
    
    root /var/www/E-Commerce/dashboard/out;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /_next/static/ {
        alias /var/www/E-Commerce/dashboard/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### API Site
```bash
sudo nano /etc/nginx/sites-available/ecommerce-api
```

```nginx
server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Enable Sites
```bash
sudo ln -s /etc/nginx/sites-available/ecommerce-client /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/ecommerce-dashboard /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/ecommerce-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 SSL Certificate Setup

### 1. Get SSL Certificates
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
sudo certbot --nginx -d admin.your-domain.com
sudo certbot --nginx -d api.your-domain.com
```

### 2. Auto-renewal
```bash
sudo crontab -e
```
Add:
```
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚀 PM2 Process Management

### 1. Create PM2 Ecosystem File
```bash
cd /var/www/E-Commerce
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'ecommerce-server',
      script: './server/dist/index.js',
      cwd: './server',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/server-error.log',
      out_file: './logs/server-out.log',
      log_file: './logs/server-combined.log',
      time: true
    },
    {
      name: 'ecommerce-client',
      script: 'npm',
      args: 'start',
      cwd: './client',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/client-error.log',
      out_file: './logs/client-out.log',
      log_file: './logs/client-combined.log',
      time: true
    },
    {
      name: 'ecommerce-dashboard',
      script: 'npm',
      args: 'start',
      cwd: './dashboard',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/dashboard-error.log',
      out_file: './logs/dashboard-out.log',
      log_file: './logs/dashboard-combined.log',
      time: true
    }
  ]
};
```

### 2. Create Logs Directory
```bash
mkdir -p logs
```

### 3. Start Applications
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔧 Firewall Configuration

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 📊 Monitoring and Maintenance

### 1. PM2 Commands
```bash
pm2 status          # Check status
pm2 logs            # View logs
pm2 monit           # Monitor in real-time
pm2 restart all     # Restart all apps
pm2 stop all        # Stop all apps
pm2 delete all      # Delete all apps
```

### 2. Log Management
```bash
# View logs
pm2 logs ecommerce-server
pm2 logs ecommerce-client
pm2 logs ecommerce-dashboard

# Clear logs
pm2 flush
```

### 3. Database Backup
```bash
# Create backup script
nano backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U ecommerce_user ecommerce > /var/backups/ecommerce_$DATE.sql
find /var/backups -name "ecommerce_*.sql" -mtime +7 -delete
```

```bash
chmod +x backup-db.sh
crontab -e
# Add: 0 2 * * * /var/www/E-Commerce/backup-db.sh
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 PID
   ```

2. **Permission Issues**
   ```bash
   sudo chown -R $USER:$USER /var/www/E-Commerce
   ```

3. **Database Connection Issues**
   ```bash
   sudo systemctl status postgresql
   sudo -u postgres psql -c "SELECT version();"
   ```

4. **Nginx Issues**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   sudo tail -f /var/log/nginx/error.log
   ```

## 🌐 Final URLs

After successful deployment:
- **Client Store**: https://your-domain.com
- **Admin Dashboard**: https://admin.your-domain.com
- **API Server**: https://api.your-domain.com

## 📝 Post-Deployment Checklist

- [ ] All applications are running (`pm2 status`)
- [ ] SSL certificates are valid
- [ ] Database is accessible
- [ ] Client store loads correctly
- [ ] Admin dashboard is accessible
- [ ] API endpoints respond correctly
- [ ] User registration/login works
- [ ] Product management works
- [ ] Payment processing works
- [ ] Email notifications work
- [ ] Backup system is configured
- [ ] Monitoring is set up

---

**🎉 Your E-Commerce platform is now live!**
