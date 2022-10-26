<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Task;
use App\Models\TaskTag;
use App\Models\Toy;
use App\Models\User;
use Faker\Generator;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
include('utils/text-to-sentences.php');

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = app(Generator::class);
//        $author = User::factory()->create();
        $tagsCount = TaskTag::count();
        $toysCount = Toy::count();
        $randomRussianExcerpt = $faker->realText(3000);
        $sentencesArray = text_to_sentences($randomRussianExcerpt, 20, 150, rand(1, 10));

        Task::factory()
            ->count(100)
            ->state([
                'is_published' => true
            ])
            ->state(new Sequence(
                fn($sequence) => [
                    'author_id' => User::all()->random(),
                    'category_id' => Category::all()->random()
                ],
            ))
            ->afterCreating(function (Task $task) use ($tagsCount, $toysCount, $sentencesArray) {
                $randomTags = TaskTag::all()->random(rand(2, round($tagsCount / 2)))->pluck('name')->toArray();
                $task->tag(...$randomTags);
                $randomToys = Toy::all()->random(rand(1, round($toysCount / 2)))->pluck('id');
                $task->toys()->attach($randomToys);
                foreach ($sentencesArray as &$value) {
                    $task->comment($value, user:  User::all()->random());
                }
                // User::first()->like($task);

            })
            ->create();
    }
}
