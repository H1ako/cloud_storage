<?php
namespace App\Services;

use App\Models\User;

class FileService
{
    public function updateOrder(User $user) {
        $filesToUpdateOrder = $user->files()->orderBy('order')->orderBy('updated_at', 'Asc')->get();

        $newOrder = 0;
        foreach($filesToUpdateOrder as $fileToUpdate) {
            $fileToUpdate->update([
                'order' => $newOrder
            ]);

            $newOrder++;
        }
    }

    public function getFilesToUploadSizes($files) {
        $sizes = [];

        foreach ($files as $file) {
            array_push($sizes, $file->getSize());
        }
        
        return $sizes;
    }
}