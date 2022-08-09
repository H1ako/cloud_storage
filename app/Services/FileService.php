<?php
namespace App\Services;

use App\Models\File;
use App\Models\User;


class FileService
{
    public function updateOrder(User $user, int $order) {
        $filesToUpdateOrder = $user->files()->where('order', '>=', $order)->get();

        foreach($filesToUpdateOrder as $fileToUpdate) {
            $fileToUpdate->update('order', $fileToUpdate->order + 1);
        }
    }
}