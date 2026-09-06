<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request)
    {
        return response()->json(
            $request->user()
        );
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        $guard = auth()->guard();

        if (method_exists($guard, 'logout')) {
            $guard->logout();
        } elseif ($user && method_exists($user, 'tokens')) {
            $user->tokens()->delete();
        }

        $user->delete();

        return response()->noContent();
    }
}
