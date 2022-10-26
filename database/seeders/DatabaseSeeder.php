<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersSeeder::class,
            TagsSeeder::class,
            ToysSeeder::class,
            CategoriesSeeder::class,
            TasksSeeder::class
        ]);
//        $maxUsersToGenerate = 10;
//        $maxToysToGenerate = 30;
//        $maxTagsToGenerate = 10;
//
//        $users = User::factory($maxUsersToGenerate)->create();
//        $tags = Tag::factory($maxTagsToGenerate)->create();
//        $toys = Toy::factory($maxToysToGenerate)->create();
//
//        $tagIds = $tags->pluck('id')->toArray();
//        $toyIds = $toys->pluck('id')->toArray();
//
//        $users->each(function ($user) use ($tagIds, $toyIds) {
//            Task::factory(rand(1, 200))->create()->each(function ($task) use ($user, $tagIds, $toyIds) {
//                $selectedToyIds = Arr::random($toyIds, rand(1, count($toyIds)));
//                $selectedTagIds = Arr::random($tagIds, rand(1, count($tagIds)));
//                $task->is_published = true;
//                $task->save();
//                $latest_task = Task::latest()->first();
//                $latest_task->tags()->syncWithoutDetaching($selectedTagIds);
//                $latest_task->toys()->syncWithoutDetaching($selectedToyIds);
//            });
//        });
    }
}
