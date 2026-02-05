import { cn } from "@/lib/clsx";
import { useTranslation } from "react-i18next";
import  { Link } from 'react-router-dom';
import { GradientSpinnerA } from "@/components/ui/GradientSpinnerA";
import { ArrowRight, Play, Music } from "lucide-react";
import { usePlayerStore } from '@/features/music/hooks/usePlayStore';

export default function Home() {
    const { t } = useTranslation();
    const playTrack = usePlayerStore(state => state.playTrack);

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <h1 className="text-4xl font-bold text-white mb-4">{t('header.title')}</h1>
            <div className="flex items-center max-sm:flex-col gap-3">
                <div className="relative overflow-hidden p-0.5 rounded-full">
                    <GradientSpinnerA theme="blue" />
                    <img
                        src="/ChrisProductions.jpg"
                        alt="Chris Productions"
                        className={cn("size-52 relative rounded-full object-cover")}
                    />
                </div>
                <p className="text-white text-lg bg-gray-800/90 border-1 border-white/15 p-4 rounded-lg max-w-lg">
                    {t('home.description')}
                    <br />
                    {t('home.descriptionextended')}
                </p>    
            </div>
            <div className="mt-8">
                <div className={cn("grid grid-cols-1 md:grid-cols-1 gap-8")}>
                    <div className={cn("flex flex-col items-center")}>
                        <div className="h-auto w-96 overflow-hidden ring-2 ring-gray-700 rounded-lg hover:ring-sky-800 transition-all duration-300">
                            <img
                                src="/sample.jpg"
                                alt="Sample"
                                className="object-cover aspect-video rounded-t-lg"
                            />
                            <div className={cn("flex flex-col bg-gray-800 h-full p-4 rounded-b-lg items-center")}>
                                <h3 className="text-white text-center font-semibold">
                                    {t('home.sampledescription')}
                                </h3>
                                <button
                                    onClick={() => playTrack({
                                        id: '1',
                                        title: 'Radiant Charge',
                                        artist: 'Chris Productions',
                                        audioUrl: 'https://pub-02e77316cbe24c94aa351b188394e94d.r2.dev/Chase%20LOTL(1).mp3',
                                        coverUrl: '/sample.jpg',
                                    })} 
                                    className={cn("rounded-full p-2 bg-blue-500 border border-blue-700 hover:bg-blue-600 mt-2")}>
                                    <Play className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cn("flex items-center justify-center")}>
                        <div className={cn("relative overflow-hidden p-0.5 rounded-lg hover:scale-105 transition-transform duration-300")}>
                            <GradientSpinnerA theme="blue" />
                            <Link
                                to="/music"
                                className={cn("size-full relative group flex p-1 transition-all duration-300 rounded-lg bg-indigo-950")}
                            >
                                <span className={cn("flex items-center font-bold text-lg gap-1")}> <Music /> {t('home.music')} <ArrowRight /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}