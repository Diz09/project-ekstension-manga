<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Komik extends Model
{
    protected $fillable = [
        'user_id',
        'nama',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function urlInduks()
    {
        return $this->hasMany(UrlInduk::class);
    }
}
