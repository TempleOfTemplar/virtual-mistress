<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaskTag>
 */
class TaskTagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->unique()->word();
        return [
            'name' => $name,
            'normalized' => mb_strtolower($name)
        ];
//        $lastId = DB::table('tags')->latest('id')->first()->id;
//        $name = json_encode(["ru" =>$title]);
//        $slug = json_encode(["ru" =>Str::slug($title)]);
//        return [
//            'name' => $name,
//            'slug' => $slug,
//            'type' => null,
//            'order_column' => $lastId + 1
//        ];
//        $title = $this->faker->unique()->word();
//        $lastId = DB::table('tags')->latest('id')->first()->id;
//        $name = json_encode(["ru" =>$title]);
//        $slug = json_encode(["ru" =>Str::slug($title)]);
//        return [
//            'name' => $name,
//            'slug' => $slug,
//            'type' => null,
//            'order_column' => $lastId + 1
//        ];
    }
}
