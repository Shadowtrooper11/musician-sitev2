import { cn } from '@/lib/clsx';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={cn( "flex items-center justify-center p-5 bg-neutral-900 border-t border-neutral-700 gap-5")}>
            <div>
                {t('footer.copyright')}
            </div>
            <div>
                <button className="cursor-not-allowed opacity-50 rounded-lg p-1 bg-zinc-500 " disabled>
                    {t('footer.languagebtn')}
                </button>
            </div>
            <div>
                <a href="https://shadowhex.dev" target="_blank" rel="noopener noreferrer" className="rounded-lg border p-1 border-neutral-800 hover:bg-neutral-700 transition-colors">
                    {t('footer.author')}
                </a>
            </div>
        </footer>
    );
}