<?php

namespace App\Http\Controllers;

use App\Models\Komik;
use App\Models\UrlInduk;
use Illuminate\Http\Request;

class UrlIndukController extends Controller
{
    public function store(Request $request, Komik $komik)
    {
        abort_unless($komik->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'url' => ['required', 'url', 'max:2048'],
        ]);

        $urlInduk = $komik->urlInduks()->create($validated);

        return response()->json($urlInduk, 201);
    }

    public function update(Request $request, UrlInduk $urlInduk)
    {
        abort_unless(
            $urlInduk->komik->user_id === $request->user()->id,
            403
        );

        $validated = $request->validate([
            'url' => ['required', 'url', 'max:2048'],
        ]);

        $urlInduk->update($validated);

        return $urlInduk;
    }

    public function destroy(Request $request, UrlInduk $urlInduk)
    {
        abort_unless(
            $urlInduk->komik->user_id === $request->user()->id,
            403
        );

        $urlInduk->delete();

        return response()->noContent();
    }
}
