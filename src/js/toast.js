let toastContainer;

/**
 * Initialize the toast system with the container element
 * @param {HTMLElement} container - The toast container element
 */
export function initializeToast(container) {
  toastContainer = container;
}

/**
 * Shows a toast notification that automatically disappears
 * @param {string} title - The title of the notification
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success', 'error', 'info')
 * @param {number} duration - Duration in milliseconds (default: 4000)
 */
export function showToast(title, message, type = 'info', duration = 4000) {
  if (!toastContainer) {
    console.error('Toast container not initialized. Call initializeToast() first.');
    return;
  }

  // Create toast element
  const toastId = `toast-${Date.now()}`;
  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = 'toast-notification transform translate-x-full transition-transform duration-300 ease-in-out';

  // Set styles and icon based on type
  let bgColor = '';
  let borderColor = '';
  let iconHTML = '';
  let titleColor = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-50';
      borderColor = 'border-green-200';
      titleColor = 'text-green-800';
      iconHTML = `
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      `;
      break;
    case 'error':
      bgColor = 'bg-red-50';
      borderColor = 'border-red-200';
      titleColor = 'text-red-800';
      iconHTML = `
        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
      break;
    default:
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
      titleColor = 'text-blue-800';
      iconHTML = `
        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      `;
  }

  toast.innerHTML = `
    <div class="max-w-sm w-full ${bgColor} border ${borderColor} rounded-lg shadow-xl p-4 backdrop-blur-sm">
      <div class="flex items-center">
        <div class="flex-shrink-0 mr-3">
          ${iconHTML}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold ${titleColor} mb-1">${title}</p>
          <p class="text-xs text-gray-500 leading-relaxed">${message}</p>
        </div>
        <div class="ml-3 flex-shrink-0">
          <button onclick="closeToast('${toastId}')" class="inline-flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Add to container
  toastContainer.appendChild(toast);

  // Trigger slide-in animation
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
    toast.classList.add('translate-x-0');
  }, 100);

  // Auto-remove after duration
  setTimeout(() => {
    closeToast(toastId);
  }, duration);
}

/**
 * Closes a specific toast notification
 * @param {string} toastId - The ID of the toast to close
 */
export function closeToast(toastId) {
  const toast = document.getElementById(toastId);
  if (toast) {
    toast.classList.remove('translate-x-0');
    toast.classList.add('translate-x-full');

    // Remove from DOM after animation
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// Make closeToast globally available for onclick handlers
window.closeToast = closeToast;
