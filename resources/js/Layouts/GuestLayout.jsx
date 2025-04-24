import ApplicationLogo from "@/Components/ApplicationLogo";
import ThemeToggler from "@/Components/ThemeToggler";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center bg-gray-100  sm:justify-center sm:pt-0 dark:bg-black">
            <div className="absolute top-6 right-6 z-10">
                <ThemeToggler />
            </div>

            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
