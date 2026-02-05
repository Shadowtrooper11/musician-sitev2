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
        </footer>
    );
}