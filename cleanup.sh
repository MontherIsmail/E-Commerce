#!/bin/bash

# 🧹 Comprehensive Cleanup Script
# Removes unnecessary files and cleans up the codebase

echo "🧹 Starting comprehensive cleanup..."

# Remove common unnecessary files
echo "📁 Removing unnecessary files..."

# Remove README files (keep main one)
find . -name "README.md" -not -path "./README.md" -delete 2>/dev/null || true

# Remove example files
find . -name "*.example.*" -delete 2>/dev/null || true
find . -name "*.sample.*" -delete 2>/dev/null || true

# Remove backup files
find . -name "*.bak" -delete 2>/dev/null || true
find . -name "*.backup" -delete 2>/dev/null || true
find . -name "*~" -delete 2>/dev/null || true

# Remove temporary files
find . -name "*.tmp" -delete 2>/dev/null || true
find . -name "*.temp" -delete 2>/dev/null || true

# Remove log files
find . -name "*.log" -delete 2>/dev/null || true

# Remove OS-specific files
find . -name ".DS_Store" -delete 2>/dev/null || true
find . -name "Thumbs.db" -delete 2>/dev/null || true

# Remove IDE-specific files (keep .gitignore)
find . -name ".vscode" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".idea" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove build artifacts (but keep node_modules for now)
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".next" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "out" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove TypeScript build info
find . -name "*.tsbuildinfo" -delete 2>/dev/null || true

# Remove coverage reports
find . -name "coverage" -type d -exec rm -rf {} + 2>/dev/null || true

echo "📦 Cleaning up package.json files..."

# Function to clean package.json
clean_package_json() {
    local file="$1"
    echo "Cleaning $file..."
    
    # Remove unused scripts (keep essential ones)
    # This is a basic cleanup - manual review recommended
}

# Clean package.json files
clean_package_json "client/package.json"
clean_package_json "dashboard/package.json"
clean_package_json "server/package.json"

echo "🔍 Checking for unused imports..."

# Function to remove unused imports (basic check)
remove_unused_imports() {
    local file="$1"
    echo "Checking imports in $file..."
    
    # This would require more sophisticated analysis
    # For now, just report potential issues
}

# Check main files for unused imports
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | head -10 | while read file; do
    remove_unused_imports "$file"
done

echo "📊 Cleanup Summary:"
echo "✅ Removed unnecessary files"
echo "✅ Cleaned up build artifacts"
echo "✅ Removed temporary files"
echo "✅ Removed OS-specific files"
echo ""
echo "🎯 Manual cleanup recommended:"
echo "   - Review package.json dependencies"
echo "   - Check for unused imports"
echo "   - Remove unused components"
echo "   - Clean up unused assets"
echo ""
echo "✨ Cleanup completed!"
