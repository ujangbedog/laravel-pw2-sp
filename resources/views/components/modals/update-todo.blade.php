<div id="update-todo-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
    <div class="bg-gray-800 p-6 rounded-lg max-w-sm w-full">
        <h3 class="text-xl font-semibold mb-4">Update Todo</h3>
        <input id="update-modal-title" type="text" class="w-full p-2 mb-4 border border-gray-600 rounded text-black" placeholder="Title">
        <textarea id="update-modal-description" class="w-full p-2 mb-4 border border-gray-600 rounded text-black" placeholder="Description"></textarea>
        <div class="mb-4">
            <input id="update-modal-completed" type="checkbox" class="mr-2">
            <label for="update-modal-completed" class="text-white">Completed</label>
        </div>
        <button id="update-todo-btn" class="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 w-full">Update</button>
        <button id="close-update-modal-btn" class="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 w-full mt-2">Cancel</button>
    </div>
</div>