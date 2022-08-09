<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LastCheckedFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'user_id'
    ];

    protected $with = [
        'file'
    ];

    public function file() {
        return $this->belongsTo(File::class, 'file_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
