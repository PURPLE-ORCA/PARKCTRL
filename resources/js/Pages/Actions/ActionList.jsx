import React, { useContext } from "react"; // <-- Import useContext
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import ActionCard from "./ActionCard";
import SearchFilterBar from "@/Components/SearchFilterBar";
import PaginationLinks from "@/Components/PaginationLinks";
import ActionDataExport from "./ActionDataExport";
import { TranslationContext } from "@/context/TranslationProvider"; // <-- Import TranslationContext

const ActionList = () => {
    const { auth, actions, filters } = usePage().props;
    const { translations } = useContext(TranslationContext); // <-- Get translations

    // Define sort options using translations
    const sortOptions = [
        {
            label: translations.sort_date_created || "Date Created", // <-- New key
            value: "created_at",
        },
        {
            label: translations.sort_action_type || "Action Type", // <-- New key
            value: "action",
        },
        {
            label: translations.sort_date_updated || "Date Updated", // <-- New key
            value: "updated_at",
        },
    ];

    // Create a separate component for export to prevent it from being part of the form
    // ActionDataExport component will need its own internationalization if it contains text
    const exportButton = <ActionDataExport data={actions.data} />;

    return (
        <Layout user={auth.user}>
            {" "}
            {/* Pass user prop if Layout requires it */}
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">
                    {/* Using actions_history might be suitable here */}
                    {translations.actions_list_title || "Actions List"}{" "}
                    {/* <-- New key */}
                </h1>

                <SearchFilterBar
                    routeName="actions.index"
                    initialFilters={filters}
                    searchPlaceholder={
                        translations.search_action_details_placeholder || // <-- New key
                        "Search by action or details..."
                    }
                    sortOptions={sortOptions} // <-- Pass translated options
                    additionalControls={exportButton}
                />

                {actions.data.length > 0 ? (
                    <div className="flex flex-wrap justify-center flex-col gap-4">
                        {actions.data.map((action, index) => (
                            <ActionCard
                                key={action.id || index}
                                action={action}
                                // Pass translations down if ActionCard needs them
                                // translations={translations}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        {translations.no_actions_found || // <-- New key
                            "No actions found. Try adjusting your search or filters."}
                    </div>
                )}

                <PaginationLinks links={actions.links} />
            </div>
        </Layout>
    );
};

export default ActionList;
