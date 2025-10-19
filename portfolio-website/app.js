// Portfolio Website JavaScript

// Project data
const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A responsive personal portfolio showcasing my projects and skills",
    technologies: ["HTML", "CSS", "JavaScript"],
    details: "Built a modern portfolio website from scratch featuring smooth navigation, interactive elements, and responsive design. Implemented form validation and dynamic content loading."
  },
  {
    title: "Blockchain Intrusion Detection System",
    description: "Real-time monitoring system for network security",
    technologies: ["Python", "Flask", "JavaScript", "Security"],
    details: "Implemented a comprehensive security monitoring dashboard with real-time alerts, IP tracking, and audit logging capabilities."
  },
  {
    title: "Voice Emergency Response System",
    description: "Multi-language voice-based emergency classification system",
    technologies: ["Python", "AI", "Speech Recognition", "Mobile"],
    details: "Created an intelligent emergency response platform with automatic language detection, speech-to-text conversion, and smart routing to appropriate response teams."
  }
];

// State management
let isMenuOpen = false;
let currentSection = 'about';

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('[data-section]');
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const projectButtons = document.querySelectorAll('.project-btn');
const successMessage = document.getElementById('success-message');

// Initialize the application
function init() {
  setupEventListeners();
  setupScrollAnimations();
  handleScroll();
}

// Event Listeners
function setupEventListeners() {
  // Navigation
  hamburger.addEventListener('click', toggleMobileMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Scroll events
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', updateActiveSection);

  // Form submission
  contactForm.addEventListener('submit', handleFormSubmit);

  // Project modals
  projectButtons.forEach(button => {
    button.addEventListener('click', handleProjectClick);
  });

  // Modal close
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Navigation click handler
function handleNavClick(e) {
  e.preventDefault();
  const targetSection = e.target.getAttribute('data-section');
  
  if (targetSection) {
    scrollToSection(targetSection);
    
    // Close mobile menu if open
    if (isMenuOpen) {
      toggleMobileMenu();
    }
  }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Handle scroll events
function handleScroll() {
  const scrollTop = window.pageYOffset;
  
  // Add scrolled class to navbar
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Update active navigation section
function updateActiveSection() {
  const sections = ['about', 'projects', 'contact'];
  const scrollTop = window.pageYOffset;
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        updateActiveNavLink(sectionId);
      }
    }
  });
}

// Update active navigation link
function updateActiveNavLink(activeSection) {
  if (currentSection !== activeSection) {
    currentSection = activeSection;
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === activeSection) {
        link.classList.add('active');
      }
    });
  }
}

// Scroll animations
function setupScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Form validation and submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Clear previous errors
  clearFormErrors();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name')?.trim();
  const email = formData.get('email')?.trim();
  const subject = formData.get('subject')?.trim();
  const message = formData.get('message')?.trim();
  
  // Validate form
  let isValid = true;
  
  if (!name) {
    showError('name-error', 'Name is required');
    isValid = false;
  }
  
  if (!email) {
    showError('email-error', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('email-error', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!subject) {
    showError('subject-error', 'Subject is required');
    isValid = false;
  }
  
  if (!message) {
    showError('message-error', 'Message is required');
    isValid = false;
  } else if (message.length < 10) {
    showError('message-error', 'Message must be at least 10 characters long');
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    submitForm(name, email, subject, message);
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form error
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Clear form errors
function clearFormErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => {
    el.textContent = '';
  });
  successMessage.classList.remove('show');
}

// Simulate form submission
function submitForm(name, email, subject, message) {
  // In a real application, you would send this data to a server
  console.log('Form submitted:', { name, email, subject, message });
  
  // Show success message
  contactForm.reset();
  successMessage.classList.add('show');
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);
}

// Project modal handling
function handleProjectClick(e) {
  const projectIndex = parseInt(e.target.getAttribute('data-project'));
  const project = projects[projectIndex];
  
  if (project) {
    showProjectModal(project);
  }
}

// Show project modal
function showProjectModal(project) {
  const modalContent = `
    <h2 class="modal-project-title">${project.title}</h2>
    <p class="modal-project-description">${project.description}</p>
    <div class="modal-project-details">
      <h4>Project Details</h4>
      <p>${project.details}</p>
    </div>
    <div class="modal-tech-section">
      <h4>Technologies Used</h4>
      <div class="modal-tech-tags">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  modalBody.innerHTML = modalContent;
  modal.classList.add('show');
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}

// Close project modal
function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}