function toast(message, type = 'info') {
    const container = document.getElementById('toast-container');

    const config = {
        success: {
            icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
            colorClass: 'text-green-500 bg-green-100'
        },
        error: {
            icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`,
            colorClass: 'text-red-500 bg-red-100'
        },
        info: {
            icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`,
            colorClass: 'text-blue-500 bg-blue-100'
        }
    };

    const styles = config[type];

    const toastEl = document.createElement('div');

    toastEl.className = "toast";

    toastEl.innerHTML = `
                <div class="toast-icon-container ${styles.colorClass}">
                    ${styles.icon}
                </div>
                <div style="margin-left: 0.75rem; font-size: 0.875rem; font-weight: 400;">${message}</div>
                <button type="button" class="toast-close-btn">
                    <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;">Close</span>
                    <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            `;

    const closeBtn = toastEl.querySelector('button');
    closeBtn.addEventListener('click', () => removeToast(toastEl));

    container.appendChild(toastEl);

    // Force reflow/layout so transition works
    requestAnimationFrame(() => {
        toastEl.classList.add('show');
    });

    setTimeout(() => {
        removeToast(toastEl);
    }, 3000);

    function removeToast(el) {
        if (!el) return;
        el.classList.remove('show');

        setTimeout(() => {
            el.remove();
        }, 500); // Match transition duration
    }
}