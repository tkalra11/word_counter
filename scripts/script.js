/*
 **
 ** User stories:
 ** - Shows number of characters, words, sentences, paragraphs - Done
 ** - Show reading time - Done
 ** - Show keyword count - Done
 ** - Show reading level (Optional - how?) - Done
 ** - Above data should change/appear on every keypress - Done
 **
 */

// Readability (Mashape) API Key for testing: PQ4FOFuaR6mshI6qpnQKQvkDZQXjp1o6Zcqjsnug7GvNggTzUE

"use strict";
var input = document.querySelectorAll('textarea')[0],
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount'),
  readingTime = document.querySelector('#readingTime'),
  readability = document.querySelector('#readability'),
  keywordsDiv = document.querySelectorAll('.keywords')[0],
  topKeywords = document.querySelector('#topKeywords');

// updating the displayed stats after every keypress
input.addEventListener('keyup', function() {

  //keeping the console clean to make only the latest data visible
  console.clear();

  // character count
  // just displaying the input length as everything is a character
  characterCount.innerHTML = input.value.length;

  // word count using \w metacharacter - replacing this with .* to match anything between word boundaries since it was not taking 'a' as a word.
  // this is a masterstroke - to count words with any number of hyphens as one word
  // [-?(\w+)?]+ looks for hyphen and a word (we make both optional with ?). + at the end makes it a repeated pattern
  // \b is word boundary metacharacter
  var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
  // console.log(words);
  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }

  // sentence count	using ./!/? as sentense separators
  if (words) {
    var sentences = input.value.split(/[.|!|?]+/g);
    console.log(sentences);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }

  // paragraph count from http://stackoverflow.com/a/3336537
  if (words) {
    // \n$ takes care of empty lines: lines with no characters, and only \n are not paragraphs
    // and need to be replaced with empty string
    var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }
  // console.log(paragraphs);

  // reading time based on 275 words/minute
  if (words) {
    var seconds = Math.floor(words.length * 60 / 275);
    // need to convert seconds to minutes and hours
    if (seconds > 59) {
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
      readingTime.innerHTML = minutes + "m " + seconds + "s";
    } else {
      readingTime.innerHTML = seconds + "s";
    }
  } else {
    readingTime.innerHTML = "0s";
  }
})
