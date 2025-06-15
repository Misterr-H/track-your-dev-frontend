import React from 'react';
import VideoJS from '../VideoJS';
import videojs from 'video.js';

type VideoJSPlayer = ReturnType<typeof videojs>;

export const ProductVideo = () => {
  const playerRef = React.useRef<VideoJSPlayer | null>(null);

  const videoJsOptions = {
    autoplay: true,
    muted: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://vz-8990676e-4f5.b-cdn.net/cc57236c-9621-46c3-9763-b184590c7c6a/playlist.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  const playerReady = (player: VideoJSPlayer) => {
    playerRef.current = player;
    player.on('waiting', () => {
      console.log('player is waiting');
    });
    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            See How It Works
          </h2>
          <p className="text-xl text-gray-300">
            Watch how our platform helps you track your tech team's productivity
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <VideoJS options={videoJsOptions} onReady={playerReady} />
          </div>
          
          {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
              <p className="text-gray-300">Our AI-powered algorithm finds the perfect developer match for your needs</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Verified Profiles</h3>
              <p className="text-gray-300">Every developer is thoroughly vetted and verified for authenticity</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Easy Integration</h3>
              <p className="text-gray-300">Seamlessly integrate with your existing workflow and tools</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}; 