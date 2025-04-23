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
        'served_to',
    ];

    public function actionLogs()
    {
        return $this->hasMany(Action::class);
    }
    public function actions()
    {
        return $this->hasMany(Action::class);
    }
    public function helpRequests()
    {
        return $this->hasMany(HelpRequest::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'served_to');
    }
}
