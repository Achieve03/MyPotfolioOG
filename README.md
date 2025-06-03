# Portfolio Website

A modern, responsive portfolio website designed to showcase graphic design work, including branding projects, illustrations, and web designs.

## Features

- Responsive design that works on all devices
- Modern and minimalist interface
- Portfolio gallery with filtering capabilities
- About section
- Contact form with PHP backend
- Blog section
- Testimonials section
- Social media integration

## Setup Instructions

1. Clone or download this repository to your web server directory.

2. Configure your email in `php/contact.php`:
   - Open `php/contact.php`
   - Replace `your-email@example.com` with your actual email address

3. Add your portfolio images:
   - Create an `images` directory
   - Add your portfolio images
   - Update the portfolio section in `index.html` with your work

4. Customize the content:
   - Update the text in `index.html` with your information
   - Modify the color scheme in `css/style.css` by updating the root variables
   - Add your profile picture to the About section
   - Update social media links in the footer

5. Test the contact form:
   - Make sure PHP is properly configured on your server
   - Test the contact form by submitting a message
   - Check your email to ensure you receive the test message

## Directory Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── php/
│   └── contact.php
├── images/
│   └── profile.jpg
└── README.md
```

## Customization

### Colors
You can customize the color scheme by modifying the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --light-gray: #f5f5f5;
    --white: #ffffff;
}
```

### Typography
The website uses Inter font from Google Fonts. You can change this by:
1. Updating the font link in `index.html`
2. Modifying the font-family in `css/style.css`

### Portfolio Items
To add portfolio items, add the following structure to the portfolio-grid div in `index.html`:

```html
<div class="portfolio-item [category]">
    <img src="images/your-image.jpg" alt="Project Title">
    <div class="portfolio-info">
        <h3>Project Title</h3>
        <p>Project Description</p>
    </div>
</div>
```

## Requirements

- Web server with PHP support
- Modern web browser
- Basic knowledge of HTML, CSS, and PHP for customization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 