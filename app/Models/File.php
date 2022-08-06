<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        // 'path',
        'size',
        'type',
        'user_id',
        'shareLink'
    ];

    protected $guarded = [];

    protected $appends = ['path'];


    public function getPathAttribute($original) {
        // Log::info($original);
        /** @var Illuminate\Filesystem\FilesystemAdapter */
        $fileSystem = Storage::disk('public');
        $path = $fileSystem->url($original);
        // Log::info($path);
        
        return $path;
    }

    public function user() {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
