<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Services\SizeService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'picture'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['files', 'subscription'];

    protected $appends = ['spaceData', 'totalSharedFiles', 'totalDeletedFiles', 'totalFiles'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getTotalSharedFilesAttribute() {
        $totalAmount = $this->files()->where('shareLink', '!=', Null)->count();
        return $totalAmount;
    }

    public function getTotalDeletedFilesAttribute() {
        $totalAmount = $this->files()->where('isDeleted', true)->count();
        return $totalAmount;
    }

    public function getTotalFilesAttribute() {
        $totalAmount = $this->files()->count();
        return $totalAmount;
    }

    public function getSpaceDataAttribute() {
        $sizeService = new SizeService;
        $maxSpace = $this->subscription()->first()->maxSpace;
        $usedSpaces = $this->files()->pluck('size')->toArray();
        $totalUsedSpace = array_sum($usedSpaces);

        $displayMaxSpace = $sizeService->getSize($maxSpace);
        $displayUsedSpace = $sizeService->getSize($totalUsedSpace);
        
        return [
            'maxSpace' => $maxSpace,
            'displayMaxSpace' => $displayMaxSpace,
            'usedSpace' => $totalUsedSpace,
            'displayUsedSpace' => $displayUsedSpace
        ];
    }

    public function setPassword($password): void {
        $this->password = Hash::make($password);
    }

    public function files() {
        return $this->hasMany(File::class);
    }

    public function lastCheckedFiles() {
        return $this->hasMany(LastCheckedFile::class);
    }

    public function subscription() {
        return $this->belongsTo(Subscription::class, 'subscription_name', 'name');
    }
}
