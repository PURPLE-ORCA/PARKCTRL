<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

     protected $fillable = [
        'name',
        'serial_number',
        'supplier',
        'price',
    ];

    public function actionLogs()
    {
        return $this->hasMany(Action::class);
    }

}
