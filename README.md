
# Harvest Data Portal

A modern data visualization application for agricultural production data with Excel-compatible input and dynamic charting capabilities.

## Features

- Modern, responsive UI with tabbed interface
- Copy-paste directly from Excel (supports multi-row/column data)
- Automatic formatting of numbers (removes punctuation)
- Dynamic production types (add, edit, remove)
- Interactive data visualization charts
- Reset to default data functionality
- Comprehensive tutorial documentation

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or yarn package manager

### Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/harvest-data-portal.git
   cd harvest-data-portal
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Deploying to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

This project is configured with GitHub Actions for automatic deployment to GitHub Pages when changes are pushed to the main branch.

1. Create a GitHub repository for your project.

2. Push your code to the repository:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repository-name.git
   git push -u origin main
   ```

3. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "GitHub Actions"
   - The deployment will automatically start when you push to the main branch

4. After deployment is complete, your site will be available at:
   ```
   https://your-username.github.io/your-repository-name/
   ```

### Option 2: Manual Deployment

If you prefer to deploy manually or need to deploy from a local environment:

1. Build the project:
   ```sh
   npm run build
   # or
   yarn build
   ```

2. The build output will be in the `dist` folder. You can deploy this folder to any static site hosting service.

3. For GitHub Pages manual deployment:
   ```sh
   # Install gh-pages if you haven't already
   npm install -g gh-pages
   
   # Deploy the dist folder
   gh-pages -d dist
   ```

## Customization

### Default Values

- Default year: 2010
- Default number of years: 14
- Default production types can be edited in the application

### Resetting Data

Use the "Riset Data" button to reset all input data to default values.

## Troubleshooting

### Common Issues

1. **Build errors**: Make sure you have the correct Node.js version (v18+).
2. **Deployment issues**: Check if your repository is properly configured for GitHub Pages.
3. **Excel paste not working**: Ensure you're copying from an Excel spreadsheet and not a text file.

### GitHub Pages Not Updating

If your GitHub Pages site is not updating after a successful workflow run:

1. Check the Actions tab in your repository to verify the workflow ran successfully
2. Ensure you've configured GitHub Pages to deploy from GitHub Actions
3. Clear your browser cache or try in an incognito window

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
