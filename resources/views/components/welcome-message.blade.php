<div id="welcome-message" class="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-6">
    <span>Selamat datang, {{ auth()->user()->name }}!</span>
    <button onclick="document.getElementById('welcome-message').style.display = 'none'" class="text-gray-400 hover:text-white ml-4">
        &times;
    </button>
</div>