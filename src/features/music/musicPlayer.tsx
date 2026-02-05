import { useState, useEffect, useRef } from 'react';
import { usePlayerStore } from '@/features/music/hooks/usePlayStore';
import { Play, Pause, X, Repeat, SkipBack, SkipForward, Shuffle } from 'lucide-react';
import { cn } from '@/lib/clsx';

export const MusicPlayer = () => {
  const { currentTrack, isPlaying, volume, currentTime, duration, togglePlay, closePlayer } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (audioRef.current.src !== currentTrack.audioUrl) {
      audioRef.current.src = currentTrack.audioUrl;
    }

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleLoadedMetadata = () => {
      const audioDuration = audioRef.current?.duration || 0;
      usePlayerStore.getState().setDuration(audioDuration);
    };

    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (isDragging) return;

      const time = audioRef.current?.currentTime || 0;
      usePlayerStore.getState().setCurrentTime(time);
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack, isDragging]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      const { repeat, nextTrack } = usePlayerStore.getState();

      if (repeat === 'one') {
        audioRef.current!.currentTime = 0;
        audioRef.current!.play();
        return;
      }

      nextTrack();
    };

    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      artwork: [
        { src: currentTrack.coverUrl, sizes: '512x512', type: 'image/png' }
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => {
      usePlayerStore.getState().togglePlay();
    });
    
    navigator.mediaSession.setActionHandler('pause', () => {
      usePlayerStore.getState().togglePlay();
    });
    
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      usePlayerStore.getState().previousTrack();
    });
    
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      usePlayerStore.getState().nextTrack();
    });
    
  }, [currentTrack]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newTime = getTimeFromPosition(e.clientX);
      usePlayerStore.getState().setCurrentTime(newTime);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (audioRef.current) {
        const { currentTime } = usePlayerStore.getState();
        audioRef.current.currentTime = currentTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration]);

  if (!currentTrack) return null;

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeFromPosition = (clientX: number) => {
    if (!progressBarRef.current) return 0;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const barWidth = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / barWidth));

    return percentage * duration;
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    const newTime = getTimeFromPosition(e.clientX);
    usePlayerStore.getState().setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const newTime = getTimeFromPosition(e.clientX);
    usePlayerStore.getState().setCurrentTime(newTime);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const newTime = getTimeFromPosition(touch.clientX);
    usePlayerStore.getState().setCurrentTime(newTime);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newTime = getTimeFromPosition(touch.clientX);
    usePlayerStore.getState().setCurrentTime(newTime);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (audioRef.current) {
      const { currentTime } = usePlayerStore.getState();
      audioRef.current.currentTime = currentTime;
    }
  };

  return (
    <div className="bg-gray-900/98 fixed bottom-10 right-2 max-sm:bottom-0 max-sm:left-1/2 w-sm max-sm:w-full z-10 rounded-lg border border-gray-700 transform -translate-x-1/2 flex flex-col">
      <audio ref={audioRef} />
      <div className="flex items-center p-5 justify-between w-full">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="size-16"
        />
        <div className="flex-col">
          <p>{currentTrack.title}</p>
          <div>{formatTime(currentTime)} / {formatTime(duration)}</div>
        </div>
        <button onClick={closePlayer} className="hover:text-red-500">
          <X />
        </button>
      </div>
      <div
        ref={progressBarRef}
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "relative w-80 h-2 mx-auto bg-gray-700 rounded-full cursor-pointer group border border-gray-600 items-center"
        )}
      >
        <div 
          className={cn(
            "absolute top-0 left-0 h-full bg-cyan-400 rounded-full"
          )}
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <div className="flex items-center p-5 justify-center gap-6 w-full">
        <button className="bg-gray-700 rounded-full p-1 ring-2 ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          <Repeat />
        </button>
        <button className="bg-gray-700 rounded-full p-1 ring-2 ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          <SkipBack />
        </button>
        <button 
          onClick={togglePlay}
          className="bg-gray-700 rounded-full p-1 ring-2 ring-gray-600 hover:bg-gray-800"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button className="bg-gray-700 rounded-full p-1 ring-2 ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          <SkipForward />
        </button>
        <button className="bg-gray-700 rounded-full p-1 ring-2 ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          <Shuffle />
        </button>
      </div>
    </div>
  );
};