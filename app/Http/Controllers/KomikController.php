<?php

namespace App\Http\Controllers;

use App\Models\Komik;
use Illuminate\Http\Request;

class KomikController extends Controller
{
    public function index(Request $request)
    {
        return Komik::where('user_id', $request->user()->id)
            ->with('urlInduks')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $komik = Komik::create([
            'user_id' => $request->user()->id,
            'nama' => $validated['nama'],
        ]);

        return response()->json($komik, 201);
    }

    public function show(Request $request, Komik $komik)
    {
        abort_unless($komik->user_id === $request->user()->id, 403);

        return $komik->load('urlInduks');
    }

    public function update(Request $request, Komik $komik)
    {
        abort_unless($komik->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $komik->update($validated);

        return $komik;
    }

    public function destroy(Request $request, Komik $komik)
    {
        abort_unless($komik->user_id === $request->user()->id, 403);

        $komik->delete();

        return response()->noContent();
    }
}
