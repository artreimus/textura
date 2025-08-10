# Textura

_Built with ❤️ by [@artreimus](https://github.com/artreimus)_

Transform your images into stunning ASCII or Braille art with precision controls for character mapping, dimensions, colors, and visual effects. Experience real-time conversion with a beautiful, responsive interface.

## ✨ Features

- **🎨 Dual Art Modes**: Convert images to ASCII art or Braille patterns with distinct algorithms
- **🎯 Precision Controls**: Customizable character maps, dimensions, threshold, and dithering options
- **🌈 Color Modes**: Full color, grayscale, or negative effects with real-time preview
- **🔄 Image Manipulation**: Flip images horizontally or vertically before conversion
- **📱 Multiple Input Methods**: Upload files, drag & drop, or load from URLs
- **📋 Export Options**: Copy to clipboard, save as TXT, or export as PNG with custom styling
- **🎞️ GIF Support**: Convert animated GIFs frame by frame with batch processing
- **🌙 Dark Mode**: Built-in dark/light theme switching with system preference detection
- **⚡ Real-time Processing**: Instant preview updates using optimized Canvas API
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- npm or your preferred package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/textura.git
   cd textura
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

Textura uses advanced image processing algorithms to convert your images into text art:

### ASCII Mode

- **Character Density Mapping**: Maps pixel brightness to character density
- **Custom Character Sets**: Choose from multiple predefined character maps or create your own
- **Luminance Calculation**: Uses ITU-R BT.601 standard for accurate grayscale conversion
- **Dimension Control**: Precise width/height controls with automatic aspect ratio preservation

### Braille Mode

- **Pattern-Based Conversion**: Maps 2×4 pixel blocks to Braille Unicode characters
- **Floyd-Steinberg Dithering**: Advanced error diffusion for improved detail retention
- **Threshold Control**: Adjustable sensitivity for black/white pattern detection
- **High Resolution**: Braille patterns provide 4× higher resolution than traditional ASCII

### Processing Pipeline

1. **Image Sampling**: Canvas API extracts pixel data with specified dimensions
2. **Color Processing**: Applies selected color mode (color/grayscale/negative)
3. **Algorithm Application**: Converts pixels to text using chosen method
4. **Real-time Rendering**: Updates preview instantly with optimized DOM manipulation

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org)**: App Router with React Server Components
- **[React 19](https://react.dev)**: Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)**: Full type safety and developer experience

### UI & Styling

- **[Tailwind CSS v4](https://tailwindcss.com/)**: Modern utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: High-quality component library with Radix UI primitives
- **[Framer Motion](https://www.framer.com/motion/)**: Smooth animations and transitions
- **[Lucide React](https://lucide.dev/)**: Beautiful, customizable icon library

### Image Processing

- **HTML5 Canvas API**: High-performance image manipulation and pixel data extraction
- **Custom Algorithms**: Optimized ASCII and Braille conversion implementations
- **Floyd-Steinberg Dithering**: Advanced error diffusion for superior Braille mode results

## 📁 Project Structure

```
├── app/                        # Next.js App Router
│   ├── components/             # Application-specific components
│   │   ├── ActionButtons.tsx   # Export, copy, reset functionality
│   │   ├── ControlPanel.tsx    # All conversion settings and options
│   │   ├── ImageUpload.tsx     # File upload and URL loading interface
│   │   └── Preview.tsx         # Real-time art preview and original image display
│   ├── hooks/                  # Custom React hooks
│   │   └── useImageConverter.tsx  # Centralized state management and conversion logic
│   ├── lib/                    # Utility libraries
│   │   ├── image-utils.ts      # Core ASCII/Braille conversion algorithms
│   │   ├── png-export.ts       # PNG export functionality with styling
│   │   ├── gif-export.ts       # GIF processing and export utilities
│   │   └── utils.ts            # General utilities and helpers
│   ├── layout.tsx              # Root layout with theme provider and fonts
│   ├── page.tsx                # Main application composition
│   └── globals.css             # Global styles and Tailwind directives
├── components/ui/              # shadcn/ui components
└── public/                     # Static assets and demo images
```

## 🎮 Usage Guide

### Basic Conversion

1. **Upload an Image**: Drag & drop a file, click to browse, or paste a URL
2. **Choose Mode**: Select ASCII or Braille conversion
3. **Customize Settings**: Adjust character maps, dimensions, colors, and effects
4. **Export Your Art**: Copy to clipboard, save as TXT, or export as styled PNG

### Advanced Features

#### ASCII Mode Settings

- **Character Map**: Choose from density-based character sets (sparse to dense)
- **Custom Dimensions**: Set precise width and height in characters
- **Color Options**: Full color, grayscale, or negative effects
- **Image Flip**: Horizontal or vertical flipping before conversion

#### Braille Mode Settings

- **Threshold Control**: Adjust black/white sensitivity (0-255)
- **Dithering**: Enable Floyd-Steinberg error diffusion for enhanced detail
- **Dimension Control**: Precise character grid sizing
- **Advanced Processing**: High-resolution pattern-based conversion

#### GIF Processing

- **Frame-by-Frame**: Convert animated GIFs with individual frame control
- **Batch Export**: Process all frames simultaneously for complete animations
- **Format Preservation**: Maintain timing and sequence information

## 🚀 Development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type check (manual)
npx tsc --noEmit
```

### Development Guidelines

- **Component Architecture**: Follow the single-responsibility principle
- **State Management**: Use the centralized `useImageConverter` hook
- **Performance**: Leverage React's built-in optimizations (useMemo, useCallback)
- **Type Safety**: Maintain strict TypeScript standards
- **Code Style**: Follow ESLint configuration and existing patterns

### Adding Features

When extending Textura:

1. **New Conversion Modes**: Add algorithms to `app/lib/image-utils.ts`
2. **UI Components**: Create components in `app/components/` following existing patterns
3. **State Management**: Extend the `useImageConverter` hook for new settings
4. **Export Formats**: Add functionality to `app/lib/png-export.ts` or create new modules

## 📦 Deployment

### Deploy on Vercel (Recommended)

1. Fork this repository
2. Connect your fork to [Vercel](https://vercel.com/new)
3. Deploy automatically with every push to main

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[ascii-image-converter](https://github.com/TheZoraiz/ascii-image-converter)**: Inspiration for conversion algorithms (Apache-2.0)
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful, accessible component library
- **[Vercel](https://vercel.com/)**: Excellent hosting platform and development experience
