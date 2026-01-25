import { Outlet } from 'react-router-dom';
import Header from './mainlayoutcomponents/Header';
import Footer from './mainlayoutcomponents/Footer';

export default function MainLayout() {
    return (
        <div className="text-gray-200 bg-[url(/chrisbg.jpg)] bg-cover bg-center">
            <Header />

            <main className="min-h-screen p-5">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}