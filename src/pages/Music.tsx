import { songs } from "@/data/music";
import { cn } from "@/lib/clsx";
import { Play } from "lucide-react";
import { usePlayerStore } from '@/features/music/hooks/usePlayStore';


export default function Home() {
    const playTrack = usePlayerStore(state => state.playTrack);

    return (
        <div className="flex justify-center flex-col">
            <div>
                <h1 className="text-3xl font-bold mb-4 text-center">Music Page</h1>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-2">
                    {songs.map((song) => (
                        <div key={song.id} className={cn("flex flex-col items-center bg-gray-800 border-1 border-white/15 rounded-lg max-w-sm")}>
                            <div className="w-full overflow-hidden ring-2 ring-gray-700 rounded-lg hover:ring-sky-800 transition-all duration-300">
                                <img
                                    src={song.coverUrl}
                                    alt={song.title}
                                    className="object-cover aspect-video rounded-t-lg"
                                />
                                <div className={cn("p-4")}>
                                    <h3 className="text-white font-semibold text-lg">
                                        {song.title}
                                    </h3>
                                    <p>
                                        {song.duration}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => playTrack({
                                            id: song.id.toString(),
                                            title: song.title,
                                            artist: song.artist,
                                            audioUrl: song.audioUrl,
                                            coverUrl: song.coverUrl,
                                        })}
                                        className={cn("rounded-full p-2 bg-blue-500 border border-blue-700 hover:bg-blue-600 mb-4")}
                                    >
                                        <Play />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}