<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PhpOption\None;

class FilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;
        $files = $request->file('files', []);
        /** @var Illuminate\Filesystem\FilesystemAdapter */
        $fileSystem = Storage::disk('userFiles');

        foreach($files as $file) {
            $fileSize = $file->getSize();
            if ($fileSize > 100000000) continue;
            
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

            $newFile = new File([
                'name' => $originalFileName,
                'type' => $fileType,
                'size' => $fileSize,
                'path' => $fullPath,
                'shareLink' => Null
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
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $file = $user->files()->find($id);
        if (! $file) return;

        $validatedData = $request->validate([
            'name' => 'min:5|not_regex:/\s+/',
            'shareLink' => 'nullable|not_regex:/\s+/|unique:files,shareLink,'.$file->id,
            'isDeleted' => 'boolean'
        ]);
        Log::info($validatedData);

        $file->update($validatedData);

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
