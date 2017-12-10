'use strict';

var TTS = (function() {
  return {
    talk : talk
  };
}());

function  talk (responseOutput) {
  var voices = window.speechSynthesis.getVoices();
  var textTospeech = new SpeechSynthesisUtterance();
  textTospeech.text = responseOutput;
  textTospeech.lang = 'en-US';
  //textTospeech.lang = voices[2].lang;
  //textTospeech.voice = voices[2];
  textTospeech.rate = 0.75;
  //textTospeech.onend = function(event) { alert('Finished in ' + event.elapsedTime + ' seconds.'); }
  window.speechSynthesis.speak(textTospeech);
}
