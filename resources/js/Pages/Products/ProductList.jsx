import React, { useContext } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/Components/DataTable/DataTable";
import { TranslationContext } from "@/context/TranslationProvider";

const ProductList = () => {
    const { products } = usePage().props;
    const { auth } = usePage().props;
    const { translations } = useContext(TranslationContext);

    const handleDelete = (product) => {
        router.delete(route("products.destroy", product.id));
    };

    const columns = [
        { accessorKey: "id", header: translations.id || "ID" },
        { accessorKey: "name", header: translations.name || "Name" },
        {
            accessorKey: "serial_number",
            header: translations.serial_number || "Serial Number",
        },
        {
            accessorKey: "supplier",
            header: translations.supplier || "Supplier",
        },
        {
            accessorKey: "service.name",
            header: translations.service || "Service",
            cell: ({ row }) => row.original.service?.name || "—",
        },
        {
            accessorKey: "price",
            header: translations.price || "Price",
            cell: ({ row }) => (
                <div>
                    {typeof row.original.price === "number"
                        ? `$${row.original.price.toFixed(2)}`
                        : row.original.price}
                </div>
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
                            <Link href={`/products/${row.original.id}/edit`}>
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="cuida:edit-outline"
                                        width="24"
                                        height="24"
                                    />
                                    <span>{translations.edit || "Edit"}</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="mingcute:delete-3-line"
                                            width="24"
                                            height="24"
                                        />
                                        <span>
                                            {translations.delete || "Delete"}
                                        </span>
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            {translations.confirm_deletion ||
                                                "Confirm Deletion"}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {translations.confirm_delete_message
                                                ? translations.confirm_delete_message.replace(
                                                      "{name}",
                                                      row.original.name
                                                  )
                                                : `Are you sure you want to delete the product "${row.original.name}"?`}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            {translations.cancel || "Cancel"}
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                handleDelete(row.original)
                                            }
                                            disabled={router.processing}
                                        >
                                            {router.processing
                                                ? translations.deleting ||
                                                  "Deleting..."
                                                : translations.confirm ||
                                                  "Confirm"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <Layout>
            <div className="p-6">
                <DataTable
                    data={products}
                    columns={columns}
                    routeName="products.index"
                    title={translations.product_list || "Product List"}
                    emptyMessage={
                        translations.no_products_found || "No products found"
                    }
                    showHeader={false}
                    addRoute={route("products.create")}
                    addLabel={translations.add_product || "Add Product"}
                />
            </div>
        </Layout>
    );
};

export default ProductList;
