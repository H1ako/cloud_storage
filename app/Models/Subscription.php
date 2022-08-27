<?php

namespace App\Models;

use App\Services\SizeService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'maxSpace',
        'name',
        'price',
        'currency'
    ];

    protected $guarded = [];

    protected $appends = ['displayMaxSpace'];

    public function user() {
        return $this->hasMany(User::class, 'id');
    }

    protected function getDisplayMaxSpaceAttribute() {
        $sizeService = new SizeService;
        $size = $sizeService->getSize($this->maxSpace);
        
        return $size;
    }
}
