@extends('layouts.main')

@section('title', 'Login')
@section('body-class', 'login-page')  {{-- هذا ما يميز صفحة login --}}

@section('content')
   <div class="login-container">
    <div class="login-glass">
      <h2>Login</h2>
      <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="input-group">
          <label for="email">Email</label>
          <div class="input-icon-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value="{{ old('email') }}"
            />
            <i class="fa-solid fa-envelope"></i>
          </div>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-icon-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <i class="fa-solid fa-lock"></i>
          </div>
        </div>
        @if($errors->any())
          <div style="color:red;text-align:center;margin-bottom:10px;">
            {{ $errors->first() }}
          </div>
        @endif
        <button class="login-btn" type="submit">Sign In</button>
      </form>
    </div>
  </div>
@endsection