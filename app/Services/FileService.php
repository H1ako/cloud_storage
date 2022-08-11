<?php
namespace App\Services;

use App\Models\File;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class FileService
{
    public function updateOrder(User $user, int $order, int $fileId) {
        $filesToUpdateOrder = $user->files()->where('id', '!=', $fileId)->where('order', '>=', $order)->get();

        foreach($filesToUpdateOrder as $fileToUpdate) {
            $fileToUpdate->update([
                'order' => $fileToUpdate->order + 1
            ]);
        }
    }
}