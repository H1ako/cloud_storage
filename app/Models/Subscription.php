<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $guarded = [
        'path',
        'size',
        'type',
    ];

    public function user() {
        return $this->hasMany(User::class, 'id');
    }
}
