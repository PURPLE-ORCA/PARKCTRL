import React, { useState, useContext, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/Components/DataTable/DataTable";
import { TranslationContext } from "@/context/TranslationProvider";

export default function Index({ auth, helpRequests, currentFilter = "all" }) {
    const { props } = usePage();
    const [filter, setFilter] = useState(currentFilter);
    const { translations } = useContext(TranslationContext);

    const columns = [
        {
            accessorKey: "user.name",
            header: translations.user || "User",
            cell: ({ row }) => <div>{row.original.user.name}</div>,
        },
        {
            accessorKey: "product.name",
            header: translations.product || "Product",
            cell: ({ row }) => (
                <div>
                    {" "}
                    {row.original.product?.name ??
                        (translations.not_applicable || "N/A")}
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: translations.description || "Description",
            cell: ({ row }) => (
                <div
                    className="max-w-xs truncate"
                    title={row.original.description}
                >
                    {row.original.description}
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: translations.date || "Date",
            cell: ({ row }) => (
                <div>{new Date(row.original.created_at).toLocaleString()}</div>
            ),
        },
        {
            accessorKey: "actions",
            header: translations.actions || "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-1">
                            <Icon
                                icon="mdi:dots-vertical"
                                className="w-5 h-5"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                            <Link
                                href={route(
                                    "help-requests.show",
                                    row.original.id
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="mdi:eye-outline"
                                        width="24"
                                        height="24"
                                    />
                                    <span>
                                        {translations.view_details ||
                                            "View Details"}
                                    </span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <Layout user={auth.user}>
            <div className="">
                <div className="overflow-hidden">
                    <div className="p-6">
                        {helpRequests.length > 0 ? (
                            <div className="mt-4">
                                <DataTable
                                    data={{ data: helpRequests }}
                                    columns={columns}
                                    routeName="help-requests.index"
                                    title={
                                        translations.help_requests ||
                                        "Help Requests"
                                    }
                                    emptyMessage={
                                        translations.no_help_requests_found ||
                                        "No help requests found"
                                    }
                                    showHeader={false}
                                    className="border rounded-lg"
                                />
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <Icon
                                    icon="mdi:inbox-outline"
                                    className="w-12 h-12 mx-auto text-gray-400"
                                />
                                <p className="mt-2 text-gray-600 text-sm">
                                    {filter === "all"
                                        ? translations.no_help_requests_found ||
                                          "No help requests found."
                                        : translations.no_filtered_help_requests ||
                                          `No ${filter.replace(
                                              "_",
                                              " "
                                          )} help requests found.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
