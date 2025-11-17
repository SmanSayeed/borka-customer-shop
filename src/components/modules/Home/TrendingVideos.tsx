'use client';

import { Button } from '@/components/ui/button';
import { videos } from '@/constants';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

const TrendingVideo = () => {
  return (
    <section className='w-full mt-24 px-6 lg:px-0'>
      <div className='container mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-5xl font-bold mb-3'>Trending on Facebook</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Watch our latest fashion reels — unboxings, try-ons & new arrivals.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {videos.map((video) => (
            <div
              key={video.id}
              className='relative overflow-hidden group border border-primary/20 hover:rounded-2xl duration-500'
            >
              <div className='relative aspect-9/16 overflow-hidden'>
                <iframe
                  src={video.iframe}
                  width='100%'
                  height='100%'
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling='no'
                  allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                  allowFullScreen
                ></iframe>

                <div className='absolute right-4 bottom-4 flex flex-col gap-3 z-20'>
                  <div className='flex flex-col items-center gap-1'>
                    <button className='w-10 h-10 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors'>
                      <Heart className='w-5 h-5' />
                    </button>
                    <span className='text-xs text-white font-semibold drop-shadow'>
                      {video.likes}
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <button className='w-10 h-10 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors'>
                      <MessageCircle className='w-5 h-5' />
                    </button>
                    <span className='text-xs text-white font-semibold drop-shadow'>
                      {video.comments}
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <button className='w-10 h-10 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors'>
                      <Share2 className='w-5 h-5' />
                    </button>
                    <span className='text-xs text-white font-semibold drop-shadow'>
                      {video.shares}
                    </span>
                  </div>
                </div>
              </div>

              {/* Username and Button */}
              <div className='py-6 text-center'>
                <p className='text-sm font-medium mb-2'>{video.username}</p>
                <Button
                  variant='default'
                  size='sm'
                  className='rounded-full'
                  onClick={() => window.open(video.url, '_blank')}
                >
                  <Eye /> Watch on Facebook
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingVideo;
