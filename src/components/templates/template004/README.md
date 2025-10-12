# Template004 - Royal Luxury

A sophisticated, elegant wedding template featuring a luxurious royal theme with deep burgundy and rich gold color scheme, Art Deco design elements, and premium styling throughout.

## Design Theme

### Color Scheme
- **Primary Colors**: Deep burgundy (#991b1b, #7c2d3e), Rich gold (#f59e0b, #d97706)
- **Secondary Colors**: Emerald green (#065f46), Deep navy (#1e3a8a)
- **Accent Colors**: Cream (#fef3c7), Ivory (#fffbeb), Rose gold (#e4a5a5)
- **Background**: Gradient from amber-50 to yellow-50 with subtle gold shimmer overlay

### Typography
- **Headings**: Playfair Display (elegant serif) - for main headings
- **Subheadings**: Cinzel (classical serif) - for section titles and labels
- **Script Font**: Great Vibes (cursive) - for special decorative text like ampersands
- **Body**: Default sans-serif for readability

## Template Structure

### Components
All components are located in `/src/components/templates/template004/`:

1. **index.tsx** - Main template component with layout and section orchestration
2. **HeroSection.tsx** - Full-screen hero with ornate frames and countdown
3. **AboutSection.tsx** - Side-by-side couple profiles with ornate divider
4. **StorySection.tsx** - Timeline with alternating luxury cards
5. **GallerySection.tsx** - Grid layout with category filters and elegant lightbox
6. **FamilySection.tsx** - Family member cards with Art Deco styling
7. **WeddingPartySection.tsx** - Wedding party members with luxury borders

### Props Interface
```typescript
interface TemplateComponentProps {
  data: WeddingTemplateData;
  primaryColor?: string;      // Default: '#991b1b' (deep burgundy)
  secondaryColor?: string;    // Default: '#f59e0b' (rich gold)
  visibility?: VisibilitySettings;
}
```

## Key Design Elements

### 1. Hero Section
- **Layout**: Full-screen centered layout with elegant gradient background
- **Features**:
  - Crown icon with sparkles
  - Couple names in Playfair Display with scripted ampersand
  - Large couple image with ornate Art Deco corner frames
  - Gold border with pulse glow animation
  - Floating gold particles animation
  - Wedding details with icons (date, time, venue)
  - Elegant ornate dividers throughout

### 2. Countdown Timer
- **Design**: Hexagonal/diamond-shaped containers
- **Features**:
  - Custom polygon clip-path for unique shape
  - Layered gold borders with gradients
  - Rich burgundy background with gold text
  - Corner sparkle decorations
  - Smooth animations and shadows

### 3. About Section (Couple Profiles)
- **Layout**: Side-by-side on desktop, stacked on mobile
- **Features**:
  - Circular photos with thick gold frames
  - Art Deco corner decorations (8 corners per photo)
  - Ornate vertical divider with heart medallion (desktop)
  - Quote styling for descriptions
  - Social media links with gold hover effects
  - Gold glow effects on images

### 4. Story Section
- **Layout**: Centered timeline with alternating cards
- **Features**:
  - Vertical gold line connecting all items
  - Circular nodes with decorative rays
  - Art Deco corner decorations on each card
  - Gold accent ribbon at top of cards
  - Date badges with gold styling
  - Image zoom on hover with gold overlay
  - Gold shine animation on card hover

### 5. Gallery Section
- **Layout**: Responsive grid (1/2/3 columns)
- **Features**:
  - Category filter buttons with gold styling
  - Grid with 1px gold separator lines
  - Hover effects with gold gradient overlay
  - Corner sparkles appear on hover
  - Luxury lightbox with ornate frame
  - Art Deco corner decorations on lightbox
  - Navigation controls in lightbox
  - Image counter display

### 6. Family Section
- **Layout**: Grouped by bride/groom side
- **Features**:
  - Section title badges with crown icons
  - Art Deco corner decorations on cards
  - Gold accent ribbons
  - Relation badges with backdrop blur
  - Gold shine animation on hover
  - Elegant dividers between sections

### 7. Wedding Party Section
- **Layout**: 4-column grid (responsive)
- **Features**:
  - Similar styling to Family Section
  - Role badges at top of images
  - Corner sparkles on hover
  - Compact card design for multiple members
  - Gold hover effects and animations

## Special Effects & Animations

### 1. Gold Shimmer Effect
```css
background: linear-gradient(90deg,
  transparent 0%,
  gold 50%,
  transparent 100%
);
background-size: 200% auto;
animation: gold-shimmer 3s linear infinite;
```

### 2. Floating Particles
- 15 particles randomly positioned
- Float from bottom to top
- Random delays and durations (8-12s)
- Fade in/out for smooth appearance

### 3. Pulse Glow
- Applied to main couple image and countdown
- Alternates shadow intensity
- 2s ease-in-out infinite loop

### 4. Hover Effects
- Scale transformations (scale-110)
- Gold overlay opacity transitions
- Shadow intensity changes
- Corner decoration scaling
- Shine animation across cards

### 5. Art Deco Corners
- Positioned absolutely at all 4 corners
- Scale on group hover
- Gold gradient borders
- Rounded corners for elegance

## Color Customization

The template accepts custom colors through props:
```typescript
<Template004
  data={weddingData}
  primaryColor="#7c2d3e"    // Deep burgundy (custom)
  secondaryColor="#f59e0b"  // Rich gold (custom)
  visibility={visibilitySettings}
/>
```

All color-dependent styles use inline `style` attributes to respect custom colors:
- Border colors
- Background gradients
- Text colors
- Shadow colors
- Hover effects

## Responsive Design

### Breakpoints
- **Mobile**: < 768px (md breakpoint)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (lg breakpoint)

### Mobile Optimizations
- Single column layouts
- Reduced font sizes
- Smaller decorative elements
- Touch-friendly button sizes
- Simplified animations
- Horizontal dividers instead of vertical

## Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus visible states
- Alt text on all images
- Screen reader friendly structure

## Performance Optimizations

- Next.js Image component for optimized loading
- Lazy loading for images
- CSS animations using transform/opacity
- Dynamic imports in template registry
- Minimal JavaScript for animations
- Efficient CSS with Tailwind

## Usage Example

```typescript
import Template004 from '@/components/templates/template004';
import { WeddingTemplateData } from '@/types/wedding-template';

const weddingData: WeddingTemplateData = {
  hero: {
    brideName: "Isabella",
    groomName: "Alexander",
    coupleImage: "/images/couple.jpg",
    weddingDate: "2024-12-25",
    weddingTime: "4:00 PM",
    venue: "The Royal Palace Gardens",
    tagline: "A Royal Celebration of Love"
  },
  // ... other sections
};

export default function WeddingPage() {
  return (
    <Template004
      data={weddingData}
      primaryColor="#991b1b"
      secondaryColor="#f59e0b"
      visibility={{
        show_hero: true,
        show_about: true,
        show_story: true,
        show_families: true,
        show_gallery: true,
        show_wedding_party: true
      }}
    />
  );
}
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Tested on:
- iOS Safari 14+
- Chrome Mobile
- Samsung Internet

## Dependencies

- React 18+
- Next.js 14+
- TypeScript 5+
- Tailwind CSS 3+
- lucide-react (for icons)

## Customization Guide

### Adding New Sections
1. Create section component in template004 folder
2. Import in index.tsx
3. Add to main component return with conditional rendering
4. Follow existing design patterns (corners, borders, colors)

### Modifying Colors
Edit default values in each section component or pass custom colors via props.

### Changing Fonts
Update Google Fonts import URL in HeroSection.tsx (applies globally via style tag).

### Adjusting Animations
Modify keyframe animations in style tags or Tailwind animation utilities.

## Known Issues & Limitations

- Gold shimmer effect may cause slight performance impact on older devices
- Floating particles limited to 15 for performance
- Lightbox doesn't support video (images only)
- Some animations may be reduced if user has `prefers-reduced-motion` set

## Future Enhancements

- [ ] Video support in gallery lightbox
- [ ] Additional color scheme presets
- [ ] More customizable ornamental elements
- [ ] Print-optimized stylesheet
- [ ] RTL language support
- [ ] Custom font upload support
- [ ] Advanced animation controls

## Credits

Design inspired by:
- Art Deco architecture and design
- Royal wedding aesthetics
- Classic luxury branding
- High-end invitation design

Fonts:
- Playfair Display by Claus Eggers Sørensen
- Cinzel by Natanael Gama
- Great Vibes by TypeSETit

## License

This template is part of the ShadiCards platform. All rights reserved.

---

For support or questions, please refer to the main TEMPLATES_AND_THEMES_DOCUMENTATION.md file.
