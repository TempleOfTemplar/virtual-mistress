<?php

namespace App\Models;

use Cviebrock\EloquentTaggable\Exceptions\NoTagsSpecifiedException;
use Cviebrock\EloquentTaggable\Services\TagService;
use Cviebrock\EloquentTaggable\Taggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Overtrue\LaravelFavorite\Traits\Favoriteable;
use Overtrue\LaravelLike\Traits\Likeable;
use RyanChandler\Comments\Concerns\HasComments;
use Illuminate\Database\Eloquent\Collection;

class Task extends Model
{
    use HasFactory, Favoriteable, Taggable, Likeable, HasComments;

    public $table = 'tasks';

    public $fillable = [
        'title',
        'excerpt',
        'category_id',
        'author_id',
        'content'
    ];

    protected $casts = [
        'title' => 'string',
        'excerpt' => 'string',
        'slug' => 'string',
        'content' => 'string',
        'is_published' => 'boolean'
    ];

    public static $rules = [
        'title' => 'required|string',
        'excerpt' => 'required|string',
        'category_id' => 'required',
        'slug' => 'string',
        'content' => 'required|string',
        'is_published' => 'boolean',
        'created_at' => 'nullable',
        'updated_at' => 'nullable'
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'author_id');
    }

    public function toys(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Toy::class, 'task_toy');
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->author_id) {
                $model->author_id = Auth::id();
            }
        });

        static::updating(function ($model) {
            if (!$model->author_id) {
                $model->author_id = Auth::id();
            }
        });
    }
}
