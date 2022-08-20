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
        'shareLink',
        'isDeleted',
        'order'
    ];

    protected $guarded = [];

    protected $appends = ['displayPath', 'checkedBy'];

    protected function getDisplayPathAttribute() {
        /** @var Illuminate\Filesystem\FilesystemAdapter */
        $fileSystem = Storage::disk('userFiles');
        $path = $fileSystem->url($this->path);
        
        return $path;
    }

    protected function getCheckedByAttribute() {
        $checksTotal = count($this->lastChecks);
        
        return $checksTotal;
    }

    // public function getOriginalPathAttribute() {
    //     return $this->path;
    // }

    public function user() {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function lastChecks() {
        return $this->hasMany(LastCheckedFile::class);
    }
}
