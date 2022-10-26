<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Toy>
 */
class ToyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = $this->faker->unique()->word();
        return [
            'title' => $title,
            'description' => $this->faker->text(200),
            'slug' => Str::slug($title),
            'image' => $this->faker->imageUrl(480, 480)
        ];
    }
}
