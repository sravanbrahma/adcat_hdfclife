'use strict';

$(function(){
  $("#talk").on('click', function(){
      var data = $("#textarea").val();
      console.log(data);
      TTS.talk(data);
  });

  $("#start_button").on('click',function(){
    $("#start_img").attr('src' , 'images/mic-animate.gif');
    $("#final_span").html('');
    $("#interim_span").html('');
    $("#watsonOutput").html('');
    STT.startDictation();
    AudioRecorder.startRecording();
  });

  Conversation.callWatson("");
});
