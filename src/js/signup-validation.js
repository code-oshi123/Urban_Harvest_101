document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  
  if (!form) return;

  // Validation rules
  const validators = {
    fullName: {
      validate: (value) => {
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Please enter a valid name (letters only)';
        return null;
      }
    },
    email: {
      validate: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
      }
    },
    phone: {
      validate: (value) => {
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10) return 'Phone number must be at least 10 digits';
        return null;
      }
    },
    password: {
      validate: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return null;
      }
    },
    confirmPassword: {
      validate: (value) => {
        const password = form.querySelector('[name="password"]').value;
        if (!value) return 'Please confirm your password';
        if (value !== password) return 'Passwords do not match';
        return null;
      }
    },
    address: {
      validate: (value) => {
        if (!value.trim()) return 'Delivery address is required';
        if (value.trim().length < 10) return 'Please enter a complete address';
        return null;
      }
    },
    plan: {
      validate: (value) => {
        if (!value) return 'Please select a subscription plan';
        return null;
      }
    },
    terms: {
      validate: (value) => {
        const checkbox = form.querySelector('[name="terms"]');
        if (!checkbox.checked) return 'You must accept the Terms & Conditions';
        return null;
      }
    }
  };

  // Show error message
  function showError(fieldName, message) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const errorDiv = document.getElementById(`${fieldName === 'fullName' ? 'name' : fieldName === 'confirmPassword' ? 'confirm-password' : fieldName}-error`);
    
    if (input && errorDiv) {
      input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
      input.classList.remove('border-gray-300', 'dark:border-gray-600');
      input.setAttribute('aria-invalid', 'true');
      
      errorDiv.classList.remove('hidden');
      errorDiv.querySelector('.error-message').textContent = message;
    }
  }

  // Hide error message
  function hideError(fieldName) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const errorDiv = document.getElementById(`${fieldName === 'fullName' ? 'name' : fieldName === 'confirmPassword' ? 'confirm-password' : fieldName}-error`);
    
    if (input && errorDiv) {
      input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
      input.classList.add('border-gray-300', 'dark:border-gray-600');
      input.setAttribute('aria-invalid', 'false');
      
      errorDiv.classList.add('hidden');
    }
  }

  // Show success state
  function showSuccess(fieldName) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (input) {
      input.classList.add('border-green-500', 'focus:border-green-500', 'focus:ring-green-500');
      input.classList.remove('border-gray-300', 'dark:border-gray-600', 'border-red-500');
    }
  }

  // Validate single field
  function validateField(fieldName, value) {
    const validator = validators[fieldName];
    if (!validator) return true;

    const error = validator.validate(value);
    if (error) {
      showError(fieldName, error);
      return false;
    } else {
      hideError(fieldName);
      showSuccess(fieldName);
      return true;
    }
  }

  // Real-time validation on blur
  Object.keys(validators).forEach(fieldName => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (input) {
      // Validate on blur
      input.addEventListener('blur', () => {
        const value = input.type === 'checkbox' ? input.checked : input.value;
        validateField(fieldName, value);
      });

      // Clear error on input (typing)
      input.addEventListener('input', () => {
        if (input.classList.contains('border-red-500')) {
          hideError(fieldName);
          input.classList.add('border-gray-300', 'dark:border-gray-600');
        }
      });
    }
  });

  // Validate confirm password when password changes
  const passwordInput = form.querySelector('[name="password"]');
  const confirmPasswordInput = form.querySelector('[name="confirmPassword"]');
  
  if (passwordInput && confirmPasswordInput) {
    passwordInput.addEventListener('input', () => {
      if (confirmPasswordInput.value) {
        validateField('confirmPassword', confirmPasswordInput.value);
      }
    });
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const formData = new FormData(form);
    
    Object.keys(validators).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      const value = input?.type === 'checkbox' ? input.checked : formData.get(fieldName) || '';
      
      if (!validateField(fieldName, value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Focus first error field
      const firstError = form.querySelector('.border-red-500');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Announce errors to screen readers
      announceToScreenReader('Please correct the errors in the form');
      return;
    }

    // Show loading state
    const submitButton = form.querySelector('#submit-btn');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg class="animate-spin inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Creating Account...
    `;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    displaySuccessMessage(formData);
    
    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      // Remove success borders
      form.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('border-green-500', 'focus:border-green-500', 'focus:ring-green-500');
        input.classList.add('border-gray-300', 'dark:border-gray-600');
      });
    }, 3000);
  });

  // Display success message
  function displaySuccessMessage(formData) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-24 right-4 max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 animate-slide-down z-50 border-l-4 border-green-600';
    successDiv.setAttribute('role', 'alert');
    successDiv.setAttribute('aria-live', 'polite');
    
    successDiv.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
            🎉 Welcome to Urban Harvest!
          </h3>
          <p class="text-gray-700 dark:text-gray-300 mb-2">
            Thank you, <strong>${formData.get('fullName')}</strong>! Your account has been created successfully.
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            We've sent a confirmation email to <strong>${formData.get('email')}</strong>. 
            Your first <strong>${formData.get('plan')}</strong> delivery will arrive within 3-5 business days.
          </p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close notification">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(successDiv);

    // Auto remove after 10 seconds
    setTimeout(() => {
      successDiv.style.animation = 'slideUp 0.3s ease-out forwards';
      setTimeout(() => successDiv.remove(), 300);
    }, 10000);

    // Announce to screen readers
    announceToScreenReader(`Success! Welcome to Urban Harvest, ${formData.get('fullName')}. Your account has been created.`);
  }

  // Screen reader announcements
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
});

// Add screen reader only class and animations to CSS if not present
if (!document.querySelector('style[data-signup-styles]')) {
  const style = document.createElement('style');
  style.setAttribute('data-signup-styles', 'true');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
    
    .animate-slide-down {
      animation: slideDown 0.3s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}