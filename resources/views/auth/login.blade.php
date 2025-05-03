<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-900 text-white flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold text-center">Login</h2>

        @if ($errors->any())
        <div id="errorMessage" class="bg-red-500 text-white p-2 rounded flex justify-between items-center">
            <span>{{ $errors->first() }}</span>
            <button onclick="closeError()" class="text-white ml-2">&times;</button>
        </div>
        @endif

        <form method="POST" action="{{ url('/login') }}" class="space-y-4" onsubmit="handleLogin(event)">
            @csrf

            <div>
                <label class="block mb-1">Email</label>
                <input type="email" name="email" required autofocus
                    class="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
                <label class="block mb-1">Password</label>
                <input type="password" name="password" required
                    class="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
                <button id="loginBtn" type="submit"
                    class="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold flex items-center justify-center gap-2">
                    <svg id="spinner" class="animate-spin h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span id="loginText">Login</span>
                </button>
            </div>
        </form>
    </div>

    <script>
        function handleLogin(event) {
            const btn = document.getElementById('loginBtn');
            const spinner = document.getElementById('spinner');
            const text = document.getElementById('loginText');

            btn.disabled = true;
            spinner.classList.remove('hidden');
            text.textContent = 'Signing in...';
        }

        function closeError() {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.style.display = 'none';
        }
    </script>
</body>

</html>