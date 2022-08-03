<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PhpOption\None;

class FilesController extends Controller
{

    protected function redirectToHomeWithFiles(Request $request) {
        $user = $request->user();
        $redirectFiles = $user->files()->orderBy('created_at', 'DESC')->get();
        return redirect()->route('home.index')->with('files', $redirectFiles)->with('user', $user);
    }
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
        $fileSystem = Storage::disk('public');

        foreach($files as $file) {
            $fileSize = $file->getSize();
            if ($fileSize > 100000000) continue;
            
            $originalFileName = $file->getClientOriginalName();
            $fileName = time().$originalFileName;
            $fileType = explode('/', $file->getMimeType())[0];
            $filePath = "userFiles/$userId/";

            $fileSystem->putFileAs(
                $filePath,
                $file,
                $fileName
            );

            $fullPath = $fileSystem->url($filePath.$fileName);

            $newFile = new File([
                'name' => $originalFileName,
                'type' => $fileType,
                'size' => $fileSize,
                'path' => $fullPath,
                'shareLink' => Null
            ]);

            $user->files()->save($newFile);
        }

        
        return $this->redirectToHomeWithFiles($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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
        $file = File::find($id);
        $validatedData = $request->validate([
            'name' => 'min:5',
            'shareLink' => 'min:2|unique:files,shareLink,'.$file->id
        ]);

        $file->update($validatedData);

        return $this->redirectToHomeWithFiles($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $file = File::find($id);

        Storage::disk('public')->delete($file->path);
        $file->destroy();
    }
}
