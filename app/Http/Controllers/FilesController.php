<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, FileService $fileService)
    {
        $user = $request->user();
        $userId = $user->id;
        $files = $request->file('files', []);
        $filesSizes = $fileService->getFilesToUploadSizes($files);
        if ($user->spaceData['usedSpace'] + array_sum($filesSizes) > $user->spaceData['maxSpace']) {
            return redirect()->back();
        }
        /** @var Illuminate\Filesystem\FilesystemAdapter */
        $fileSystem = Storage::disk('userFiles');

        foreach($files as $file) {
            $fileSize = $file->getSize();
            $originalFileName = $file->getClientOriginalName();
            $fileName = time().$originalFileName;
            $fileType = explode('/', $file->getMimeType())[0];
            $filePath = "$userId/";

            $fileSystem->putFileAs(
                $filePath,
                $file,
                $fileName
            );

            $fullPath = $filePath.$fileName;
            $fileOrder = 0;
            $lastOrderFile = $user->files()->orderBy('order', 'DESC')->first();
            if ($lastOrderFile) $fileOrder = $lastOrderFile->order + 1;

            $newFile = new File([
                'name' => $originalFileName,
                'type' => $fileType,
                'size' => $fileSize,
                'path' => $fullPath,
                'shareLink' => Null,
                'order' => $fileOrder
            ]);

            $user->files()->save($newFile);
        }

        
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $shareLink
     * @return \Illuminate\Http\Response
     */
    public function show($shareLink)
    {
        $file = File::where('shareLink', $shareLink)->first();

        if ($file->isDeleted) return redirect()->route('home');

        /** @var \App\Models\User $user **/
        $user = Auth::user();

        if ($user) {
            $fileCheck = $user->lastCheckedFiles()->where('file_id', $file->id)->first();

            if ($fileCheck) {
                $fileCheck->updated_at = now();
                $fileCheck->save();
            }
            else $user->lastCheckedFiles()->create([
                'file_id' => $file->id
            ]);
        }
        
        return inertia('FilePage', [
            'file' => $file,
        ]);
    }

    /**
     * Display the full size file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $filePath
     * @return \Illuminate\Http\Response
     */
    public function showFullSize(Request $request, $filePath)
    {
        $file = File::where('path', $filePath)->first();
        if (! $file) return 'no file';
        $user = $request->user();

        if (!$file->user_id === $user->id && !$file->shareLink) return 'no permissions';

        $path = storage_path("app/userFiles\\${filePath}");

        return response()->file($path);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, FileService $fileService)
    {
        $user = $request->user();
        $file = $user->files()->find($id);
        if (! $file) return;

        $validatedData = $request->validate([
            'order' => 'integer',
            'name' => 'min:5|not_regex:/\s+/',
            'shareLink' => 'nullable|not_regex:/\s+/|unique:files,shareLink,'.$file->id,
            'isDeleted' => 'boolean'
        ]);

        $file->update($validatedData);
        
        if (isset($validatedData['order'])) {
            $fileService->updateOrder($user);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $file = $user->files()->find($id);
        if (! $file) return redirect()->back();

        Storage::disk('userFiles')->delete($file->path);
        $file->delete();

        return redirect()->back();
    }
}
