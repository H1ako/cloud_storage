<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $guarded = [
        'path',
        'size',
        'type',
        'user'
    ];



    public function user() {
        return $this->belongsTo(User::class, 'id', 'user');
    }
}