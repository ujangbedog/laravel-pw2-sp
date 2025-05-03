<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Dashboard')</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-900 text-white font-sans min-h-screen flex flex-col">

    <header class="bg-gray-800 p-4 shadow-md">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold"><a href="/dashboard">Dashboard</a></h1>
            <div class="flex gap-3">
                <a href="/dashboard/profile" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-200">Profile</a>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button class="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-200">
                        Logout
                    </button>
                </form>
            </div>
        </div>
    </header>

    <main class="flex-grow p-10">
        @yield('content')
    </main>

</body>

</html>