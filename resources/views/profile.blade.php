@extends('layouts.app')

@section('title', 'Profile')

@section('content')
<div class="min-h-screen bg-gray-900 py-10">
    <div class="max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl transform transition duration-500 hover:scale-105">
        <div class="md:flex">
            <div class="md:shrink-0 flex justify-center items-center p-6 md:p-8">
                <div class="relative group">
                    <img class="h-32 w-32 rounded-full object-cover border-4 border-blue-600 transform transition duration-500 group-hover:rotate-6"
                        src="/images/profile.jpg" alt="Profile Image">
                    <div class="absolute inset-0 rounded-full bg-blue-500 bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <!-- Icon -->
                        </svg>
                    </div>
                </div>
            </div>
            <div class="p-8 md:p-6">
                <div class="uppercase tracking-wide text-sm text-blue-400 font-semibold animate-fadeIn">Profile</div>
                <h1 class="mt-1 text-2xl font-bold text-white animate-fadeIn">Ilham Alfath</h1>

                <div class="mt-6 space-y-4">
                    @foreach ([
                    ['label' => 'NIM', 'value' => 'D11911037', 'icon' => '
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14M5 11h14M5 15h14M5 19h14" />
                    </svg>
                    '],
                    ['label' => 'Angkatan', 'value' => '2019', 'icon' => '
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-6.16 3.422A12.083 12.083 0 015.18 9.021 12.083 12.083 0 0112 14z" />
                    </svg>
                    '],
                    ['label' => 'Jurusan', 'value' => 'Teknik Informatika', 'icon' => '
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v2m-6 4h12a2 2 0 002-2V8a2 2 0 00-2-2h-3V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    '],
                    ['label' => 'Jenis Kelamin', 'value' => 'Laki-laki', 'icon' => '
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A4 4 0 017 16h10a4 4 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    '],
                    ] as $index => $info)
                    <div class="flex items-center animate-slideRight" style="animation-delay: {{ ($index + 1) * 100 }}ms;">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/20 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {!! $info['icon'] !!}
                            </svg>
                        </div>
                        <div>
                            <div class="text-xs text-gray-400">{{ $info['label'] }}</div>
                            <div class="font-medium text-white">{{ $info['value'] }}</div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes slideRight {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 0.8s ease forwards;
    }

    .animate-slideRight {
        animation: slideRight 0.8s ease forwards;
    }
</style>
@endsection