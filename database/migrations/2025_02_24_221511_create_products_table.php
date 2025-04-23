<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('serial_number', 100)->unique();
            $table->string('supplier', 150);
            $table->decimal('price', 10, 2);
            $table->unsignedBigInteger('served_to')->nullable();
            $table->foreign('served_to')->references('id')->on('services')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};