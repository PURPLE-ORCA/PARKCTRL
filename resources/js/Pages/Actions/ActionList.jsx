import React, { act } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import ActionCard from "./ActionCard";
import SearchFilterBar from "@/Components/SearchFilterBar";
import PaginationLinks from "@/Components/PaginationLinks";
import ActionDataExport from "./ActionDataExport";

const ActionList = () => {
    const { auth, actions, filters } = usePage().props;

    // Define sort options based on your schema
    const sortOptions = [
        { label: "Date Created", value: "created_at" },
        { label: "Action Type", value: "action" },
        { label: "Date Updated", value: "updated_at" },
    ];

    // Create a separate component for export to prevent it from being part of the form
    const exportButton = <ActionDataExport data={actions.data} />;

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Actions List</h1>

                <SearchFilterBar
                    routeName="actions.index"
                    initialFilters={filters}
                    searchPlaceholder="Search by action or details..."
                    sortOptions={sortOptions}
                    additionalControls={exportButton}
                />

                {actions.data.length > 0 ? (
                    <div className="flex flex-wrap justify-center flex-col gap-4">
                        {actions.data.map((action, index) => (
                            <ActionCard
                                key={action.id || index}
                                action={action}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No actions found. Try adjusting your search or filters.
                    </div>
                )}

                <PaginationLinks links={actions.links} />
            </div>
        </Layout>
    );
};

export default ActionList;
