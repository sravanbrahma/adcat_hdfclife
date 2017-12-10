'use strict';

var STT = (function(){
  return {
    startDictation : startDictation
  };
}());

var final_transcript = '';
var recognizing = false;
var recognition = new webkitSpeechRecognition();
var speechData = '';

if ('webkitSpeechRecognition' in window) {
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
  };

  recognition.onerror = function(event) {
    console.log(event.error);
  };

  recognition.onend = function() {
    recognizing = false;
    console.log("End");
    console.log(speechData);
    $("#start_img").attr('src' , 'images/mic.gif');
    Conversation.callWatson(speechData);
    AudioRecorder.stopRecording();
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_span.innerHTML = final_transcript;
    interim_span.innerHTML = interim_transcript;
    speechData = final_transcript + interim_transcript;

  };
}

function startDictation(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
}
