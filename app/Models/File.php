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
        'path',
        'size',
        'type',
        'user_id',
        'shareLink'
    ];

    protected $guarded = [];

    protected $appends = ['displayPath'];

    protected function getDisplayPathAttribute() {
        /** @var Illuminate\Filesystem\FilesystemAdapter */
        $fileSystem = Storage::disk('userFiles');
        $path = $fileSystem->url($this->path);
        
        return $path;
    }

    public function getOriginalPathAttribute() {
        return $this->path;
    }

    public function user() {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
