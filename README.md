# Amazin Timber - Production Website

A professional B2B timber industry website optimized for Netlify deployment with Netlify Forms integration.

## 🚀 Quick Netlify Deployment

### Method 1: Drag & Drop (Recommended)
1. Download/export this entire project folder
2. Go to [netlify.com](https://netlify.com) and log in
3. Drag the project folder to the deployment area
4. Your site will be live immediately with a random URL

### Method 2: GitHub Integration
1. Push this code to a GitHub repository
2. Connect your GitHub repo to Netlify
3. Deploy will happen automatically on each push

## 📋 Post-Deployment Setup

### 1. Custom Domain & HTTPS
- Go to Site Settings > Domain management
- Add your custom domain
- Enable HTTPS (automatic with custom domains)

### 2. Forms Configuration
- Go to Site Settings > Forms
- Verify the "quote" form appears in the list
- Set up email notifications for form submissions
- Forms will work immediately - no additional setup required

### 3. Replace Placeholders

#### Google Analytics
```html
<!-- In index.html head section, replace: -->
{{GA_MEASUREMENT_ID}}
<!-- With your actual GA4 ID, then uncomment the GA script -->
```

#### Contact Information
Replace these placeholders throughout the site:
- `contact@amazintimber.com` → Your actual email

#### Logo & Assets
Upload your files to these exact paths:
- `/assets/amazin-timber-logo.png` → Your logo file
- `/assets/Amazin_Timber_en.pdf` → English catalog PDF
- `/assets/Amazin_Timber_ar.pdf` → Arabic catalog PDF
- `/assets/Amazin_Timber_pt.pdf` → Portuguese catalog PDF
- `/assets/Amazin_Timber_es.pdf` → Spanish catalog PDF
- `/assets/Amazin_Timber_fr.pdf` → French catalog PDF

### 4. Content Customization

#### Key Files to Edit:
- `index.html` → Main content, contact info, GA ID
- `css/styles.css` → Colors, fonts, styling
- `js/main.js` → Functionality (rarely needs changes)

#### Brand Colors (in css/styles.css):
```css
--brand-green: 155 61% 20%;      /* #0F5132 */
--brand-green-700: 155 55% 25%;  /* #146C43 */
--brand-wood: 28 55% 45%;        /* #A26D3D */
```

## 🌍 Arabic Translation Setup

### Translation Process:
1. Open `index.ar.html`
2. Replace all content within `[Arabic placeholders]`
3. Test RTL layout and adjust CSS if needed
4. Consider cultural adaptations for business messaging

### Translation Keys:
Create a JSON file for systematic translation:
```json
{
  "nav.home": "الرئيسية",
  "nav.products": "المنتجات",
  "hero.title": "[Your Arabic title]",
  // ... add all content keys
}
```

## 🔧 Advanced Features

### Enable reCAPTCHA (if spam becomes an issue):
In `index.html` form section, uncomment:
```html
<div data-netlify-recaptcha="true"></div>
```
Then enable reCAPTCHA in Netlify Site Settings > Forms.

### Analytics & Monitoring:
- Set up Google Analytics GA4
- Monitor form submissions in Netlify dashboard
- Use Netlify Analytics for visitor insights

## 📱 Technical Features Included

✅ **Performance Optimized**
- Lazy loading images
- Minified CSS & deferred JS
- Preloaded critical assets
- WebP/JPEG image support

✅ **SEO Ready**
- Semantic HTML structure
- Meta tags & Open Graph
- JSON-LD structured data
- Sitemap.xml & robots.txt

✅ **Accessibility Compliant**
- WCAG guidelines followed
- Skip-to-content link
- Keyboard navigation
- Screen reader friendly
- High contrast support

✅ **Mobile Responsive**
- Mobile-first design
- Touch-friendly interactions
- Responsive typography
- Collapsible navigation

## 🛠️ File Structure
```
├── index.html              # Main page
├── success.html            # Form success page
├── 404.html               # Error page
├── index.ar.html          # Arabic version (scaffold)
├── css/styles.css         # All styles
├── js/main.js             # Interactive functionality
├── assets/
│   ├── hero.jpg           # Hero background image
│   ├── woodgrain.jpg      # Species section image
│   └── [your-files]       # Logo, catalog, etc.
├── netlify.toml           # Netlify configuration
├── robots.txt             # SEO crawling rules
├── sitemap.xml            # Site structure for search engines
└── README.md              # This file
```

## 📞 Support

For technical issues or customization requests, refer to:
- Netlify Documentation: [docs.netlify.com](https://docs.netlify.com)
- HTML/CSS/JS modifications in respective files
- Form troubleshooting: Check Netlify Site Settings > Forms

---

**Built with:** HTML5, CSS3, Vanilla JavaScript, Netlify Forms
**Optimized for:** Performance, SEO, Accessibility, Mobile