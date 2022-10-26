<?php

namespace Database\Seeders;

use App\Models\TaskTag;
use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TaskTag::factory(12)->create();
    }
}
