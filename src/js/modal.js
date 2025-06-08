/**
 * Custom modal system for confirmations and alerts
 */

let modalContainer = null;

/**
 * Initialize the modal system
 */
export function initializeModal() {
  // Create modal container if it doesn't exist
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    modalContainer.className = "fixed inset-0 z-50 hidden";
    document.body.appendChild(modalContainer);
  }
}

/**
 * Show a confirmation modal
 * @param {string} title - The title of the modal
 * @param {string} message - The message to display
 * @param {Object} options - Options for the modal
 * @param {string} options.confirmText - Text for confirm button (default: "Confirm")
 * @param {string} options.cancelText - Text for cancel button (default: "Cancel")
 * @param {string} options.confirmClass - CSS class for confirm button (default: "bg-red-500 hover:bg-red-600")
 * @returns {Promise<boolean>} - Promise that resolves to true if confirmed, false if cancelled
 */
export function showConfirmModal(title, message, options = {}) {
  return new Promise((resolve) => {
    const {
      confirmText = "Confirm",
      cancelText = "Cancel",
      confirmClass = "bg-red-500 hover:bg-red-600",
    } = options;

    const modalHTML = `
      <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-slideIn border border-gray-200">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-red-100">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-medium text-gray-900 mb-2">${title}</h3>
              <p class="text-sm text-gray-500 mb-6">${message}</p>
            </div>
            <div class="flex space-x-3">
              <button
                id="modal-cancel"
                type="button"
                class="flex-1 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                ${cancelText}
              </button>
              <button
                id="modal-confirm"
                type="submit"
                class="flex-1 ${confirmClass} text-white rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                ${confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.remove("hidden");

    // Add event listeners
    const confirmBtn = modalContainer.querySelector("#modal-confirm");
    const cancelBtn = modalContainer.querySelector("#modal-cancel");
    const backdrop = modalContainer.querySelector(".fixed.inset-0");

    const handleConfirm = () => {
      hideModal();
      resolve(true);
    };

    const handleCancel = () => {
      hideModal();
      resolve(false);
    };

    confirmBtn.addEventListener("click", handleConfirm);
    cancelBtn.addEventListener("click", handleCancel);

    // Close on backdrop click
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        handleCancel();
      }
    });

    // Close on Escape key
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        handleCancel();
        document.removeEventListener("keydown", handleKeydown);
      }
    };
    document.addEventListener("keydown", handleKeydown);

    // Focus the cancel button by default
    setTimeout(() => cancelBtn.focus(), 100);
  });
}

/**
 * Show an alert modal
 * @param {string} title - The title of the modal
 * @param {string} message - The message to display
 * @param {Object} options - Options for the modal
 * @param {string} options.type - Type of alert: 'info', 'success', 'warning', 'error' (default: 'info')
 * @param {string} options.buttonText - Text for the button (default: "OK")
 * @returns {Promise<void>} - Promise that resolves when the modal is closed
 */
export function showAlertModal(title, message, options = {}) {
  return new Promise((resolve) => {
    const { type = "info", buttonText = "OK" } = options;

    // Define icon and colors based on type
    const typeConfig = {
      info: {
        bgClass: "bg-blue-100",
        textClass: "text-blue-600",
        buttonClass: "bg-blue-500 hover:bg-blue-600",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
      },
      success: {
        bgClass: "bg-green-100",
        textClass: "text-green-600",
        buttonClass: "bg-green-500 hover:bg-green-600",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`,
      },
      warning: {
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-600",
        buttonClass: "bg-yellow-500 hover:bg-yellow-600",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>`,
      },
      error: {
        bgClass: "bg-red-100",
        textClass: "text-red-600",
        buttonClass: "bg-red-500 hover:bg-red-600",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`,
      },
    };

    const config = typeConfig[type];

    const modalHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-slideIn">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 w-10 h-10 mx-auto flex items-center justify-center rounded-full ${config.bgClass}">
                <svg class="w-6 h-6 ${config.textClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${config.icon}
                </svg>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-medium text-gray-900 mb-2">${title}</h3>
              <p class="text-sm text-gray-500 mb-6">${message}</p>
            </div>
            <div class="flex justify-center">
              <button
                id="modal-ok"
                class="${config.buttonClass} text-white rounded-md px-6 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
              >
                ${buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.remove("hidden");

    // Add event listeners
    const okBtn = modalContainer.querySelector("#modal-ok");
    const backdrop = modalContainer.querySelector(".fixed.inset-0");

    const handleClose = () => {
      hideModal();
      resolve();
    };

    okBtn.addEventListener("click", handleClose);

    // Close on backdrop click
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        handleClose();
      }
    });

    // Close on Escape key
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        handleClose();
        document.removeEventListener("keydown", handleKeydown);
      }
    };
    document.addEventListener("keydown", handleKeydown);

    // Focus the OK button
    setTimeout(() => okBtn.focus(), 100);
  });
}

/**
 * Hide the modal
 */
function hideModal() {
  if (modalContainer) {
    modalContainer.classList.add("hidden");
    modalContainer.innerHTML = "";
  }
}
