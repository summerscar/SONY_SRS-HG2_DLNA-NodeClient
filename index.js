var MediaRendererClient = require('upnp-mediarenderer-client');

// Instanciate a client with a device description URL (discovered by SSDP)
var client = new MediaRendererClient('http://192.168.2.210:54380/MediaRenderer_SRS-HG1.xml');

// Load a stream with subtitles and play it immediately
var options = { 
  autoplay: true,
//   contentType: 'video/avi',
  metadata: {
    title: 'yueliangwan',
    creator: 'feieryuedui',
    type: 'audio', // can be 'video', 'audio' or 'image'
    // subtitlesUrl: 'http://url.to.some/subtitles.srt'
  }
};

client.load('http://173.82.114.233/example.mp3', options, function(err, result) {
  if(err) throw err;
  console.log('playing ...');
});

// Pause the current playing stream
// client.pause();

// Unpause
// client.play();

// Stop
// client.stop();

// Seek to 10 minutes
// client.seek(10 * 60);

client.on('status', function(status) {
  // Reports the full state of the AVTransport service the first time it fires,
  // then reports diffs. Can be used to maintain a reliable copy of the
  // service internal state.
  console.log(status);
});

client.on('loading', function() {
  console.log('loading');
});

client.on('playing', function() {
  console.log('playing');

  client.getPosition(function(err, position) {
    console.log(position); // Current position in seconds
  });

  client.getDuration(function(err, duration) {
    console.log(duration); // Media duration in seconds
  });
});

client.on('paused', function() {
  console.log('paused');
});

client.on('stopped', function() {
  console.log('stopped');
});

client.on('speedChanged', function(speed) {
  // Fired when the user rewinds of fast-forwards the media from the remote
  console.log('speedChanged', speed);
});

process.on('SIGINT', () => {
    client.stop();
    console.log('DLNA STOP.');
    process.exit()
  });