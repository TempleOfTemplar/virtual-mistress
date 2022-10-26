<?php

namespace App\Models;

use FilamentCurator\Models\Media;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Toy extends Model
{
    use HasFactory;

    public $table = 'toys';

    public $fillable = [
        'title',
        'description',
        'slug',
        'image'
    ];

    protected $casts = [
        'title' => 'string',
        'description' => 'string',
        'slug' => 'string',
        'image' => 'string'
    ];

    public static $rules = [
        'title' => 'required|string',
        'description' => 'nullable|string',
        'slug' => 'required|string',
        'created_at' => 'nullable',
        'updated_at' => 'nullable',
        'image' => 'nullable|string'
    ];

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'task_toy');
    }

    public function image(): HasOne
    {
        return $this->hasOne(Media::class, 'id', 'image');
    }

//    protected $with = ['image'];
//
//    public function image(): HasOne
//    {
//        return $this->hasOne(Media::class, 'id', 'image');
//    }
}
