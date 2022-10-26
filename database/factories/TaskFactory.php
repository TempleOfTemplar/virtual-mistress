<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $randomRussianTitle = $this->faker->realText(10);
        $randomRussianExcerpt = $this->faker->realText(200);
        return [
            'title' => $randomRussianTitle,
            'excerpt' => $randomRussianExcerpt,
//            'author_id'=>$this->faker->randomElement($authorIds),
            'slug' => $this->faker->unique()->slug(),
//            'category_id'=>$this->faker->randomElement($categoryIds),
            'content' => $this->faker->realText()
        ];
    }
}
