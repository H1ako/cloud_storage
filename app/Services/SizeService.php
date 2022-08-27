<?php
namespace App\Services;


class SizeService
{
    public function getSize(int $originalSize) {
        $type = 'Kb';
        $size = $originalSize / 1024;
        if ($size > 1024) {
            $size /= 1024;
            $type = 'Mb';
        }
        if ($size > 1024) {
            $size /= 1024;
            $type = 'Gb';
        }
        $roundedSize = round($size, 2);
        
        return "{$roundedSize}{$type}";
    }
}