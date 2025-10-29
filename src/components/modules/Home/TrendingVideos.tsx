'use client';

import { Button } from '@/components/ui/button';
import { Eye, Heart, MessageCircle, Share2, UserPlus } from 'lucide-react';

const TrendingVideo = () => {
  const videos = [
    {
      id: 1,
      url: 'https://www.facebook.com/reel/3087933404712855/',
      iframe: `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F3087933404712855%2F&show_text=false&width=267&t=0&autoplay=true&mute=1&loop=true`,
      username: '@faithjourney',
      likes: '1.2K',
      comments: '230',
      shares: '80',
    },
    {
      id: 2,
      url: 'https://www.facebook.com/reel/3650327968430482/',
      iframe: `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F3650327968430482%2F&show_text=false&width=267&t=0&autoplay=true&mute=1&loop=true`,
      username: '@faithjourney',
      likes: '950',
      comments: '120',
      shares: '60',
    },
    {
      id: 3,
      url: 'https://www.facebook.com/reel/2210782086110657/',
      iframe: `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2210782086110657%2F&show_text=false&width=267&t=0&autoplay=true&mute=1&loop=true`,
      username: '@faithjourney',
      likes: '560',
      comments: '70',
      shares: '25',
    },
    {
      id: 4,
      url: 'https://www.facebook.com/reel/685991903859388/',
      iframe: `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F685991903859388%2F&show_text=false&width=267&t=0&autoplay=true&mute=1&loop=true`,
      username: '@faithjourney',
      likes: '1.8K',
      comments: '310',
      shares: '120',
    },
  ];

  return (
    <section className='w-full mt-24 px-6 lg:px-0'>
      <div className='container mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-3'>Trending on Facebook</h2>
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
              {/* Video */}
              <div className='relative aspect-[9/16] overflow-hidden'>
                <iframe
                  src={video.iframe}
                  width='100%'
                  height='100%'
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling='no'
                  allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                  allowFullScreen
                ></iframe>

                {/* Interaction Buttons */}
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
