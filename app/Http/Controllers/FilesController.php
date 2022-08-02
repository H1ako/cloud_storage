<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
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
                'shareLink' => ''
            ]);

            $user->files()->save($newFile);
        }

        $redirecFiles = $user->files()->orderBy('created_at', 'DESC')->get();
        return redirect()->route('home.index')->with('files', $redirecFiles)->with('user', $user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
