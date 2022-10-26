<?php

use App\Models\Comment;
use App\Models\User;

return [

    'model' => Comment::class,

    /** @phpstan-ignore-next-line */
    'user' => User::class,

];
