<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Komik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KomikController extends Controller
{
    public function index(Request $request)
    {
        $komiks = Komik::where(
            'user_id',
            $request->user()->id
        )
            ->with('urlInduks')
            ->latest()
            ->get();

        return Inertia::render('web/komik/index', [
            'komiks' => $komiks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $request->user()->komiks()->create($validated);

        return back();
    }

    public function update(
        Request $request,
        Komik $komik
    ) {
        abort_unless(
            $komik->user_id === $request->user()->id,
            403
        );

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $komik->update($validated);

        return back();
    }

    public function destroy(
        Request $request,
        Komik $komik
    ) {
        abort_unless(
            $komik->user_id === $request->user()->id,
            403
        );

        $komik->delete();

        return back();
    }
}