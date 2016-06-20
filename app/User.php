<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{   
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];
}
