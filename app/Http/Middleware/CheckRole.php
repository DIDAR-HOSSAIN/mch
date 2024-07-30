<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login')->withErrors(['msg' => 'User not authenticated']);
        }

        if ($user->user_status !== 1) {
            Auth::logout();
            return redirect()->route('login')->withErrors(['msg' => 'User inactive']);
        }

        $roles = ['super-admin', 'admin', 'sub-admin', 'user', 'general'];
        foreach ($roles as $role) {
            if ($user->hasRole($role)) {
                return $next($request);
            }
        }

        Auth::logout();
        return redirect()->route('login')->withErrors(['msg' => 'User unauthorized']);
    }
}
