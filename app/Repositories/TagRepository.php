<?php

namespace App\Repositories;

use App\Models\TaskTag;

class TagRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'normalized'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return TaskTag::class;
    }
}
