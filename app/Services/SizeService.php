<?php
namespace App\Services;


class SizeService
{
    public function getSize(int $originalSize) {
        // $S = 'KMGTPEZY';
        // $F = floor((strlen($originalSize) - 1) / 3);
        // return sprintf("%.2f", $originalSize/pow(1024, $F)).' '.@$S[$F-1].'B';

        $units = ['B', 'KB', 'MB', 'GB', 'TB']; 

        $bytes = max($originalSize, 0); 
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024)); 
        $pow = min($pow, count($units) - 1); 
        $bytes /= pow(1024, $pow);

        return round($bytes, 2) . ' ' . $units[$pow]; 
    }
}