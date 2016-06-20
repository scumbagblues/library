<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Softdeletes;

class Book extends Model
{
    use Softdeletes;

    protected $table = 'books';
    protected $primaryKey = 'book_id';
    protected $fillable = ['name','published_date','category_id'];
    protected $dates = ['deleted_at'];

    public function categories()
    {
        return $this->hasMany('App\Category','category_id','category_id');
    }
}
