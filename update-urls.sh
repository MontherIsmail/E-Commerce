#!/bin/bash

# Script to replace all hardcoded localhost URLs with environment variables
# Run this in the dashboard directory

echo "🔄 Updating hardcoded URLs to use environment variables..."

# Find all files with hardcoded localhost URLs and replace them
find . -name "*.tsx" -o -name "*.ts" -o -name "*.js" | xargs grep -l "http://localhost:5000" | while read file; do
    echo "Updating $file..."
    
    # Replace the URLs
    sed -i 's|http://localhost:5000/api/v1|${process.env.NEXT_PUBLIC_API_URL \|\| "http://localhost:5000/api/v1"}|g' "$file"
    
    # For files that need getApiUrl function, add import if not present
    if grep -q "getApiUrl" "$file" && ! grep -q "import.*getApiUrl" "$file"; then
        # Add import at the top
        sed -i '1i import { getApiUrl } from "../config/api";' "$file"
    fi
done

echo "✅ URL updates completed!"
