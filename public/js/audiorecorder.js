'use strict';
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

if(getBrowser() == "Chrome"){
	var constraints = {"audio": true};
}else if(getBrowser() == "Firefox"){
	var constraints = {audio: true};
}

var AudioRecorder = (function() {

  return {
    getBrowser: getBrowser,
    startRecording: startRec,
    stopRecording: stopRec
  };
}());

var mediaRecorder;
var chunks = [];
var count = 0;


function startRecording(stream) {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start(10);

  	mediaRecorder.ondataavailable = function(e) {
  		chunks.push(e.data);
  	};

  	mediaRecorder.onerror = function(e){
  		console.log('Error: ', e);
  	};


  	mediaRecorder.onstart = function(){
  		console.log('Started & state = ' + mediaRecorder.state);
  	};

    mediaRecorder.onstop = function(){
      console.log('Stopped  & state = ' + mediaRecorder.state);

      var blob = new Blob(chunks, {type: "audio/webm"});
      console.log(blob);
      console.log(chunks);
      chunks = [];
    	//var videoURL = window.URL.createObjectURL(blob);
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        var base64data = reader.result;
        console.log(base64data );
        $("#audioTag").attr('src', base64data);
        var audio = document.getElementById('audio');
				if (audio)
        	audio.load();
      }
    };

    /*mediaRecorder.onpause = function(){
      console.log('Paused & state = ' + mediaRecorder.state);
    }

    mediaRecorder.onresume = function(){
      console.log('Resumed  & state = ' + mediaRecorder.state);
    }

    mediaRecorder.onwarning = function(e){
      console.log('Warning: ' + e);
    };*/
}

function stopRec() {
  mediaRecorder.stop();
}

function errorCallback(error){
	console.log('navigator.getUserMedia error: ', error);
}

function startRec (){
	 if (typeof MediaRecorder === 'undefined' || !navigator.getUserMedia) {
		alert('MediaRecorder not supported on your browser, use Firefox 30 or Chrome 49 instead.');
	}else {
		navigator.getUserMedia(constraints, startRecording, errorCallback);
	}
}

function getBrowser(){
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
	 browserName = "Microsoft Internet Explorer";
	 fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	 browserName = "Chrome";
	 fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	 browserName = "Safari";
	 fullVersion = nAgt.substring(verOffset+7);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	 browserName = "Firefox";
	 fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
		   (verOffset=nAgt.lastIndexOf('/')) )
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 fullVersion = nAgt.substring(verOffset+1);
	 if (browserName.toLowerCase()==browserName.toUpperCase()) {
	  browserName = navigator.appName;
	 }
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	   fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
	 fullVersion  = ''+parseFloat(navigator.appVersion);
	 majorVersion = parseInt(navigator.appVersion,10);
	}


	return browserName;
}
