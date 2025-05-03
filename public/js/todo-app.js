// TodoApp object to encapsulate functionality
const TodoApp = {
    currentPage: 1,
    isLoading: false,
    // CSRF token from meta tag
    csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

    // Show loading progress bar under the add button
    showLoadingProgress() {
        document.getElementById('loading-progress-container').classList.remove('hidden');
        document.getElementById('todo-table-container').classList.add('opacity-50');
    },

    // Hide loading progress bar
    hideLoadingProgress() {
        document.getElementById('loading-progress-container').classList.add('hidden');
        document.getElementById('todo-table-container').classList.remove('opacity-50');
    },

    // Show global loading overlay with animation
    showGlobalLoading(message = 'Processing...') {
        const overlay = document.getElementById('global-loading-overlay');
        const messageElement = document.getElementById('loading-message');
        const progressBar = document.getElementById('loading-progress-bar');

        messageElement.textContent = message;
        overlay.classList.remove('hidden');

        // Reset and animate progress bar
        progressBar.style.width = '0%';

        // Animate progress bar from 0 to 90% (leaving 10% for completion)
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 90) {
                clearInterval(interval);
            } else {
                width += Math.random() * 3;
                if (width > 90) width = 90;
                progressBar.style.width = width + '%';
            }
        }, 100);

        // Store interval ID for cleanup
        this.progressInterval = interval;

        // Disable all buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
        });

        this.isLoading = true;
    },

    // Hide global loading overlay
    hideGlobalLoading() {
        const overlay = document.getElementById('global-loading-overlay');
        const progressBar = document.getElementById('loading-progress-bar');

        // Complete progress bar animation
        clearInterval(this.progressInterval);
        progressBar.style.width = '100%';

        // Brief delay to show complete progress before hiding
        setTimeout(() => {
            overlay.classList.add('hidden');

            // Enable all buttons
            document.querySelectorAll('button').forEach(btn => {
                btn.disabled = false;
            });

            this.isLoading = false;
        }, 300);
    },

    // Show success message
    showSuccessMessage(message) {
        const successMessage = document.getElementById("success-message");
        const successMessageText = document.getElementById("success-message-text");
        successMessageText.textContent = message;
        successMessage.classList.remove("hidden");
        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 3000);
    },

    // Load todos with pagination
    loadTodos(page = 1) {
        this.showLoadingProgress();

        fetch(`/todos?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const todoList = document.getElementById("todo-list");
                todoList.innerHTML = "";

                if (data.data.length === 0) {
                    // Show empty state
                    const emptyRow = document.createElement("tr");
                    emptyRow.innerHTML = `
                <td colspan="4" class="px-4 py-8 text-center text-gray-400">
                    <div class="flex flex-col items-center">
                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        <p>No todos found. Create one now!</p>
                    </div>
                </td>
            `;
                    todoList.appendChild(emptyRow);
                } else {
                    data.data.forEach(todo => {
                        const todoItem = document.createElement("tr");
                        todoItem.classList.add("bg-gray-700");
                        todoItem.innerHTML = `
                    <td class="px-4 py-2">${todo.title}</td>
                    <td class="px-4 py-2">${todo.description}</td>
                    <td class="px-4 py-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${todo.completed ? 'Completed' : 'Pending'}
                        </span>
                    </td>
                    <td class="px-4 py-2 text-center">
                        <button class="text-green-500 hover:text-green-400 transition-colors" onclick="TodoApp.openUpdateModal(${todo.id})">
                            <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="text-red-500 hover:text-red-400 transition-colors ml-2" onclick="TodoApp.openDeleteModal(${todo.id})">
                            <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </td>`;
                        todoList.appendChild(todoItem);
                    });
                }

                // Update pagination
                const pagination = document.getElementById("pagination");
                pagination.innerHTML = "";

                if (data.last_page > 1) {
                    // Add previous button
                    const prevButton = document.createElement("button");
                    prevButton.classList.add("px-4", "py-2", "bg-gray-700", "text-white", "mx-1", "rounded");
                    prevButton.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            `;
                    prevButton.disabled = page === 1;
                    if (page === 1) {
                        prevButton.classList.add("opacity-50", "cursor-not-allowed");
                    }
                    prevButton.addEventListener("click", () => {
                        if (!this.isLoading && page > 1) {
                            this.loadTodos(page - 1);
                        }
                    });
                    pagination.appendChild(prevButton);

                    // Page numbers
                    for (let i = 1; i <= data.last_page; i++) {
                        const pageLink = document.createElement("button");
                        pageLink.classList.add("px-4", "py-2", "bg-gray-700", "text-white", "mx-1", "rounded");
                        pageLink.textContent = i;

                        if (i === page) {
                            pageLink.classList.add("bg-blue-600");
                        }

                        pageLink.addEventListener("click", () => {
                            if (!this.isLoading) {
                                this.loadTodos(i);
                            }
                        });

                        pagination.appendChild(pageLink);
                    }

                    // Add next button
                    const nextButton = document.createElement("button");
                    nextButton.classList.add("px-4", "py-2", "bg-gray-700", "text-white", "mx-1", "rounded");
                    nextButton.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            `;
                    nextButton.disabled = page === data.last_page;
                    if (page === data.last_page) {
                        nextButton.classList.add("opacity-50", "cursor-not-allowed");
                    }
                    nextButton.addEventListener("click", () => {
                        if (!this.isLoading && page < data.last_page) {
                            this.loadTodos(page + 1);
                        }
                    });
                    pagination.appendChild(nextButton);
                }

                this.currentPage = page;
            })
            .catch(error => {
                console.error('Error loading todos:', error);
                this.showSuccessMessage("Error loading todos. Please try again.");

                // Show error state
                const todoList = document.getElementById("todo-list");
                todoList.innerHTML = `
            <tr>
                <td colspan="4" class="px-4 py-8 text-center text-red-400">
                    <div class="flex flex-col items-center">
                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p>Failed to load todos. Please try again.</p>
                    </div>
                </td>
            </tr>
        `;
            })
            .finally(() => {
                this.hideLoadingProgress();
            });
    },

    // Add todo methods
    openAddModal() {
        if (this.isLoading) return;

        document.getElementById("modal-title").value = '';
        document.getElementById("modal-description").value = '';
        document.getElementById("modal-completed").checked = false;
        document.getElementById("add-todo-modal").classList.remove("hidden");
    },

    closeAddModal() {
        document.getElementById("add-todo-modal").classList.add("hidden");
    },

    saveTodo() {
        if (this.isLoading) return;

        const title = document.getElementById("modal-title").value.trim();
        const description = document.getElementById("modal-description").value.trim();
        const completed = document.getElementById("modal-completed").checked;

        if (title && description) {
            this.showGlobalLoading('Adding new todo...');

            fetch("/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": this.csrfToken,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        completed
                    }),
                })
                .then(response => response.json())
                .then(() => {
                    this.loadTodos(this.currentPage);
                    this.showSuccessMessage("Todo successfully added.");
                    this.closeAddModal();
                })
                .catch(error => {
                    console.error('Error adding todo:', error);
                    this.showSuccessMessage("Error adding todo. Please try again.");
                })
                .finally(() => {
                    this.hideGlobalLoading();
                });
        }
    },

    // Update todo methods
    openUpdateModal(id) {
        if (this.isLoading) return;

        this.showGlobalLoading('Loading todo data...');

        fetch(`/todos/${id}`)
            .then(response => response.json())
            .then(todo => {
                document.getElementById("update-modal-title").value = todo.title;
                document.getElementById("update-modal-description").value = todo.description;
                document.getElementById("update-modal-completed").checked = todo.completed;
                document.getElementById("update-todo-btn").setAttribute("data-id", todo.id);
                document.getElementById("update-todo-modal").classList.remove("hidden");
            })
            .catch(error => {
                console.error('Error fetching todo:', error);
                this.showSuccessMessage("Error fetching todo data. Please try again.");
            })
            .finally(() => {
                this.hideGlobalLoading();
            });
    },

    closeUpdateModal() {
        document.getElementById("update-todo-modal").classList.add("hidden");
    },

    updateTodo() {
        if (this.isLoading) return;

        const id = document.getElementById("update-todo-btn").getAttribute("data-id");
        const title = document.getElementById("update-modal-title").value.trim();
        const description = document.getElementById("update-modal-description").value.trim();
        const completed = document.getElementById("update-modal-completed").checked;

        if (title && description) {
            this.showGlobalLoading('Updating todo...');

            fetch(`/todos/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": this.csrfToken,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        completed
                    }),
                })
                .then(response => response.json())
                .then(() => {
                    this.loadTodos(this.currentPage);
                    this.showSuccessMessage("Todo successfully updated.");
                    this.closeUpdateModal();
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                    this.showSuccessMessage("Error updating todo. Please try again.");
                })
                .finally(() => {
                    this.hideGlobalLoading();
                });
        }
    },

    // Delete todo methods
    openDeleteModal(id) {
        if (this.isLoading) return;

        document.getElementById("delete-todo-btn").setAttribute("data-id", id);
        document.getElementById("delete-todo-modal").classList.remove("hidden");
    },

    closeDeleteModal() {
        document.getElementById("delete-todo-modal").classList.add("hidden");
    },

    deleteTodo() {
        if (this.isLoading) return;

        const id = document.getElementById("delete-todo-btn").getAttribute("data-id");

        this.showGlobalLoading('Deleting todo...');

        fetch(`/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.csrfToken,
                },
            })
            .then(() => {
                this.loadTodos(this.currentPage);
                this.showSuccessMessage("Todo successfully deleted.");
                this.closeDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
                this.showSuccessMessage("Error deleting todo. Please try again.");
            })
            .finally(() => {
                this.hideGlobalLoading();
            });
    },

    // Initialize the Todo App
    init() {
        // Button event listeners
        document.getElementById("add-todo-btn").addEventListener("click", () => this.openAddModal());
        document.getElementById("close-modal-btn").addEventListener("click", () => this.closeAddModal());
        document.getElementById("save-todo-btn").addEventListener("click", () => this.saveTodo());
        document.getElementById("close-update-modal-btn").addEventListener("click", () => this.closeUpdateModal());
        document.getElementById("update-todo-btn").addEventListener("click", () => this.updateTodo());
        document.getElementById("close-delete-modal-btn").addEventListener("click", () => this.closeDeleteModal());
        document.getElementById("delete-todo-btn").addEventListener("click", () => this.deleteTodo());

        // Load todos on init
        this.loadTodos();
    }
};

// Initialize the Todo App when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add global TodoApp reference
    window.TodoApp = TodoApp;
    
    // Initialize
    TodoApp.init();
});