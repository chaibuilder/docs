const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs.json');
const README_FILENAME = 'README.md';

/**
 * Convert a string to start case (capitalize first letter of each word)
 * @param {string} str - Input string
 * @returns {string} - String in start case
 */
function toStartCase(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract title from markdown content
 * @param {string} content - Markdown content
 * @returns {string} - Extracted title or filename as fallback
 */
function extractTitleFromMarkdown(content, filename) {
  // Look for the first heading (# Title)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch && titleMatch[1]) {
    return toStartCase(titleMatch[1].trim());
  }
  
  // If no title found, use the filename without extension and order prefix
  const title = filename.replace(/^\d+-/, '').replace(/\.md$/, '').replace(/-/g, ' ');
  return toStartCase(title);
}

/**
 * Parse order from filename
 * @param {string} filename - Filename with potential order prefix (e.g., '01-getting-started')
 * @returns {number} - Extracted order or 999 as fallback
 */
function parseOrder(filename) {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 999;
}

/**
 * Generate a slug from a path
 * @param {string} filePath - File path
 * @returns {string} - Generated slug
 */
function generateSlug(filePath) {
  return '/docs/' + filePath
    .replace(/^\d+-/g, '') // Remove leading numbers
    .replace(/\/\d+-/g, '/') // Remove numbers in path segments
    .replace(/\.md$/, '') // Remove .md extension
    .toLowerCase(); // Convert to lowercase
}

/**
 * Build tree structure recursively
 * @param {string} dirPath - Path to process
 * @param {string} relativePath - Path relative to docs directory
 * @returns {Object} - Tree structure
 */
function buildTree(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  // Process directories first, then files
  const dirs = entries.filter(entry => entry.isDirectory());
  const files = entries.filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name !== README_FILENAME);
  
  // Sort by order prefix in filename
  dirs.sort((a, b) => parseOrder(a.name) - parseOrder(b.name));
  files.sort((a, b) => parseOrder(a.name) - parseOrder(b.name));
  
  const result = [];
  
  // Process directories
  for (const dir of dirs) {
    const dirName = dir.name;
    const dirFullPath = path.join(dirPath, dirName);
    const dirRelativePath = path.join(relativePath, dirName);
    
    // Check if directory has a README.md
    const readmePath = path.join(dirFullPath, README_FILENAME);
    let title = dirName.replace(/^\d+-/, '').replace(/-/g, ' ');
    
    if (fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf8');
      title = extractTitleFromMarkdown(content, dirName);
    } else {
      // Apply start case to directory title even if no README exists
      title = toStartCase(title);
    }
    
    // Build children
    const children = buildTree(dirFullPath, dirRelativePath);
    
    if (children.length > 0 || files.length > 0) {
      result.push({
        id: dirRelativePath,
        title,
        slug: generateSlug(dirRelativePath),
        children
      });
    }
  }
  
  // Process files
  for (const file of files) {
    const fileName = file.name;
    const fileFullPath = path.join(dirPath, fileName);
    const fileRelativePath = path.join(relativePath, fileName);
    
    // Read file content to extract title
    const content = fs.readFileSync(fileFullPath, 'utf8');
    const title = extractTitleFromMarkdown(content, fileName);
    
    result.push({
      id: fileRelativePath,
      title,
      slug: generateSlug(fileRelativePath),
      path: '/docs/' + fileRelativePath // Prefix with '/docs/' and keep the full relative path with .md extension
    });
  }
  
  return result;
}

/**
 * Main function
 */
function main() {
  try {
    console.log(`Building docs tree from: ${DOCS_DIR}`);
    
    // Build the tree
    const tree = buildTree(DOCS_DIR);
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tree, null, 2));
    
    console.log(`✅ Docs tree generated successfully: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error generating docs tree:', error);
    process.exit(1);
  }
}

// Run the script
main();
