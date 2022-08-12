<?php
namespace App\Services;

use App\Models\File;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class FileService
{
    public function updateOrder(User $user, int $order, int $fileId) {
        $filesToUpdateOrder = $user->files()->where('id', '!=', $fileId)->where('order', '>', $order)->orderBy('order')->get();

        $newOrder = $order + 1;
        foreach($filesToUpdateOrder as $fileToUpdate) {
            $newOrder++;
            $fileToUpdate->update([
                'order' => $newOrder
            ]);
        }
    }
}