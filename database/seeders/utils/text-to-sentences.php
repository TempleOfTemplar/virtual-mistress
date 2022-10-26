<?php
function text_to_sentences($long_string, $min_length = 15, $max_length = 150, $max_sentences = 10, $encoding = 'UTF-8')
{
    // If total string length less than given max length of sentence -
    // returns array of this string.
    $string_length = mb_strlen($long_string, $encoding);
    if ($string_length <= $max_length) {
        return [$long_string];
    }

    // If string contains only one word -
    // returns array of this word.
    $words_array = explode(' ', $long_string);
    if (count($words_array) < 2) {
        return $words_array;
    }

    // If length of the first word of string is greater than given max length of sentence -
    // cuts length of word down to max length and returns array of this word.
    $first_word = $words_array[0];
    if (mb_strlen($first_word, $encoding) > $max_length) {
        return [mb_substr($first_word, 0, $max_length, $encoding)];
    }

    $sentences_array = [];
    $ended_word = 0;

    // Gathers sentences
    for ($sentence = 0; $sentence < $max_sentences; $sentence++) {
        $short_string = '';

        foreach ($words_array as $word_number => $current_word) {
            $expected_length = mb_strlen($short_string . ' ' . $current_word, $encoding);
            if ($expected_length > rand($min_length, $max_length)) {
                break;
            }

            $short_string .= $current_word . ' ';
            $ended_word = $word_number + 1;
        }

        $sentences_array[] = $short_string;
        $words_array = array_slice($words_array, $ended_word);

        if (!$words_array) {
            break;
        }
    }

    // Returns array of sentences
    return $sentences_array;
}
