<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UrlInduk extends Model
{
    protected $fillable = [
        'komik_id',
        'url',
    ];

    public function komik()
    {
        return $this->belongsTo(Komik::class);
    }
}
