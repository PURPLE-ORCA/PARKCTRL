import React from "react";
import { router } from "@inertiajs/react";
import { Table } from "@/components/ui/table";
import DataTableHeader from "./DataTableHeader";
import DataTablePagination from "./DataTablePagination";
import DataTableEmpty from "./DataTableEmpty";

const DataTable = ({
    data,
    columns,
    routeName,
    title,
    addRoute = null,
    addLabel = "Add New",
    emptyMessage = "No items found",
}) => {
    const items = data?.data || [];
    const total = data?.total || 0;
    const links = data?.links || [];

    return (
        <div>
            <DataTableHeader
                title={title}
                addRoute={addRoute}
                addLabel={addLabel}
            />

            <div className="text-sm text-gray-500 my-4">
                {items.length > 0
                    ? `Showing ${items.length} of ${total} items`
                    : `Showing 0 of ${total} items`}
            </div>

            {items.length > 0 ? (
                <div className="bg-white dark:bg-transparent rounded-lg shadow overflow-hidden">
                    <Table columns={columns} data={items} />
                </div>
            ) : (
                <DataTableEmpty message={emptyMessage} />
            )}

            {links.length > 3 && <DataTablePagination links={links} />}
        </div>
    );
};

export default DataTable;
