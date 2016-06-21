<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Book;
use App\Category;


class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::with('categories')->get();

        return response()->json($books->toArray());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        Book::create($request->all());
        return response()->json(["message" => "Book created"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
        return Book::with('categories')->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
        $bookData = $request->all();
        unset($bookData['categories']);
        $update = Book::where('book_id',$id)->update($bookData);
        
        if($update){
            return response()->json(["message" => "Book updated"]);   
        }else{
            return response()->json(["message" => "Error with the update"]);   
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $book = Book::findOrFail($id);

        if ($book) {
            $book->delete();
            return response()->json(["message" => "Book deleted"]);
        }else{
            return response()->json(["message" => "The Book was not deleted"]);
        }
    }

    public function updateUserBook(Request $request){
        $bookData = $request->all();
        $update = Book::where('book_id',$id)->update($bookData);
        
        if($update){
            return response()->json(["message" => "Book updated"]);   
        }else{
            return response()->json(["message" => "Error with the update"]);   
        }
    }
}
