import QuickAccessBar from "@/Components/QuickAccessBar";
import { TranslationContext } from "@/context/TranslationProvider";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { useContext } from "react";

export default function Dashboard({}) {
    const { translations } = useContext(TranslationContext);

    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="flex justify-between items-center mt-8 mb-8 mr-6">
                <h1 className="text-3xl font-bold">{translations.dashboard}</h1>
                <QuickAccessBar />
            </div>
        </Layout>
    );
}
