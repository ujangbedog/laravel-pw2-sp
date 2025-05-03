<div class="bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Todo App</h2>

    <!-- Button Add Todo -->
    <div class="mb-4">
        <button id="add-todo-btn" class="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">Add Todo</button>
    </div>

    <!-- Loading Progress Bar -->
    @include('components.loading.progress-bar')

    <!-- Success Message -->
    @include('components.todo.success-message')

    <!-- Todo Table -->
    @include('components.todo.table')

    <!-- Pagination -->
    @include('components.todo.pagination')
</div>