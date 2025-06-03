document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Portfolio items with the new images
    const portfolioItems = [
        {
            category: 'web',
            image: 'pics/campaign-creators-ARW7Ic7MSAM-unsplash.jpg', // First workspace image
            title: 'Lead Generation Platform',
            description: 'Modern web platform for B2B lead generation and nurturing'
        },
        {
            category: 'web',
            image: 'pics/huy-phan-eIioBNJFufI-unsplash.jpg', // Second workspace image
            title: 'Creative Workspace Design',
            description: 'Clean and modern workspace setup for creative professionals'
        },
        {
            category: 'web',
            image: 'pics/huy-phan-LEVRaos2Ero-unsplash.jpg', // Third workspace image
            title: 'Remote Work Setup',
            description: 'Ergonomic and productive home office design'
        },
        {
            category: 'branding',
            image: 'pics/marina-zvada-wkHsJN_AWXc-unsplash.jpg', // POS system image
            title: 'Restaurant POS System',
            description: 'Modern point-of-sale interface design for restaurants'
        },
        {
            category: 'illustration',
            image: 'pics/sumup-8DmMxd5_1nE-unsplash.jpg', // Landscape image
            title: 'Travel Photography',
            description: 'Capturing the beauty of coastal landscapes'
        },
        {
            category: 'branding',
            image: 'pics/sumup-8rI0-i70RsI-unsplash.jpg', // Invoice system image
            title: 'Invoice Management System',
            description: 'Clean and efficient billing interface design'
        }
    ];

    // Function to create portfolio items
    function createPortfolioItems() {
        portfolioGrid.innerHTML = '';
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Initialize portfolio items
    createPortfolioItems();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            const items = document.querySelectorAll('.portfolio-item');

            items.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('php/contact.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    // Show error message
                    showNotification(result.message || 'Error sending message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error sending message. Please try again.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // Notification function
    function showNotification(message, type) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add notification to the page
        document.body.appendChild(notification);

        // Add styles dynamically
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.color = '#fff';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.5s ease-out forwards';

        if (type === 'success') {
            notification.style.backgroundColor = '#2ecc71';
        } else {
            notification.style.backgroundColor = '#e74c3c';
        }

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // Add necessary styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .notification {
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            font-family: 'Inter', sans-serif;
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}); 