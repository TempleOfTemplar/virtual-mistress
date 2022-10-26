<?php

namespace App\Repositories;

use App\Models\Toy;
use App\Repositories\BaseRepository;

class ToyRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title',
        'description',
        'slug',
        'image'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Toy::class;
    }
}
