# Environment Variable Configuration Guide

## Favicon Path Configuration

The applications now support flexible base path configuration through environment variables.

### Environment Variables

#### Client App (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Base Path Configuration (Optional)
# Development: Leave empty or unset
# Production: Set to your desired subpath
NEXT_PUBLIC_BASE_PATH=/ecommerce
```

#### Dashboard App (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Base Path Configuration (Optional)
# Development: Leave empty or unset
# Production: Set to your desired subpath
NEXT_PUBLIC_BASE_PATH=/ecommerce-admin
```

### Configuration Logic

1. **Priority Order:**
   - `NEXT_PUBLIC_BASE_PATH` environment variable (highest priority)
   - `NODE_ENV === 'production'` fallback (lowest priority)

2. **Development Mode:**
   - `NEXT_PUBLIC_BASE_PATH` = empty string or unset
   - Favicon paths: `/favicon.ico`, `/favicon.svg`, etc.

3. **Production Mode:**
   - `NEXT_PUBLIC_BASE_PATH` = `/ecommerce` (client) or `/ecommerce-admin` (dashboard)
   - Favicon paths: `/ecommerce/favicon.ico`, `/ecommerce-admin/favicon.svg`, etc.

### Usage Examples

#### Local Development
```bash
# No environment variables needed
npm run dev
# Favicons work at: http://localhost:3000/favicon.ico
```

#### Production with Custom Path
```bash
# Set environment variable
export NEXT_PUBLIC_BASE_PATH=/my-custom-path
npm run build
npm start
# Favicons work at: https://yourdomain.com/my-custom-path/favicon.ico
```

#### Production with Default Path
```bash
# No environment variable (uses NODE_ENV)
NODE_ENV=production npm run build
npm start
# Client: https://yourdomain.com/ecommerce/favicon.ico
# Dashboard: https://yourdomain.com/ecommerce-admin/favicon.ico
```

### Benefits

- ✅ **Flexible Deployment**: Works with any subpath configuration
- ✅ **Environment-Specific**: Different paths for dev/staging/production
- ✅ **Backward Compatible**: Falls back to NODE_ENV if env var not set
- ✅ **Easy Configuration**: Single environment variable controls all paths
