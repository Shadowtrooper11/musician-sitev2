import { create } from 'zustand';

interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
  duration?: number;
}

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  duration: number;
  currentTime: number;
  volume: number;
  showVolumeSlider: boolean;
  playlist: Track[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';


  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleVolumeSlider: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  closePlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentTrack: null,
  duration: 0,
  currentTime: 0,
  volume: 1,
  showVolumeSlider: false,
  playlist: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'off',

  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (vol) => set({ volume: vol }),
  toggleVolumeSlider: () => set((state) => ({ showVolumeSlider: !state.showVolumeSlider })),

  nextTrack: () => {
    const { playlist, currentIndex, shuffle, repeat } = get();
    if (playlist.length === 0) return;
    
    let nextIndex = currentIndex + 1;
    
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    }

    if (repeat === 'one') {
      nextIndex = currentIndex;
    }
    else if (nextIndex >= playlist.length) {
      nextIndex = repeat === 'all' ? 0 : currentIndex;
    }
    
    set({ currentIndex: nextIndex, currentTrack: playlist[nextIndex], isPlaying: true });
  },
  
  previousTrack: () => {
    const { playlist, currentIndex, currentTime } = get();
    if (playlist.length === 0) return;

    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = playlist.length - 1;
    
    set({ currentIndex: prevIndex, currentTrack: playlist[prevIndex], isPlaying: true });
  },
  
  seekTo: (time) => {
    set({ currentTime: time });
  },
  
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  
  toggleRepeat: () => set((state) => ({
    repeat: state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off'
  })),
  
  closePlayer: () => set({ 
    isPlaying: false, 
    currentTrack: null, 
    currentTime: 0,
    showVolumeSlider: false 
  }),
}));