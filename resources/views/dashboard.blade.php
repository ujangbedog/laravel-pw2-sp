@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="max-w-4xl mx-auto">
    <!-- Welcome Message Component -->
    @include('components.welcome-message')

    <!-- Todo App Container Component -->
    @include('components.todo.container')
</div>

<!-- Global Loading Overlay -->
@include('components.loading.global-overlay')

<!-- Modal Components -->
@include('components.modals.add-todo')
@include('components.modals.update-todo')
@include('components.modals.delete-todo')

<!-- Add CSRF Token Meta Tag for JS -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Load JavaScript -->
<script src="{{ asset('js/todo-app.js') }}"></script>
@endsection