import React, { useContext } from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    ArrowLeft,
    Calendar,
    User,
    AlertCircle,
    Package,
    Barcode,
    Building2,
    ClipboardList,
    Activity,
    FileText,
    CheckCircle,
    Clock, 
    Wrench, 
    XCircle, 
} from "lucide-react";
import { Badge } from "@/Components/ui/badge"; 
import { Button } from "@/Components/ui/button";
import { TranslationContext } from "@/context/TranslationProvider";
import { Separator } from "@/components/ui/separator";

export default function Show({ auth, helpRequest }) {
    const { translations } = useContext(TranslationContext);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleString(undefined, {
                // Use locale formatting
                dateStyle: "medium",
                timeStyle: "short",
            });
        } catch (e) {
            return "Invalid Date";
        }
    };

    const DetailItem = ({ icon: Icon, label, children }) => (
        <div className="flex items-start space-x-3">
            <Icon
                className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0"
                aria-hidden="true"
            />
            <div className="flex-grow">
                <p className="text-sm font-medium text-muted-foreground">
                    {label}
                </p>
                <p className="font-medium text-foreground break-words">
                    {children || "N/A"}
                </p>
            </div>
        </div>
    );

    return (
        <Layout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-xl text-foreground leading-tight">
                        {translations.help_request_details ||
                            "Help Request Details"}
                        <span className="text-base text-muted-foreground ml-2">
                            #{helpRequest.id}
                        </span>
                    </h2>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route("help-requests.index")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {translations.back_to_list || "Back to List"}
                        </Link>
                    </Button>
                </div>
            }
        >
            <Head
                title={`${
                    translations.help_request_details || "Help Request Details"
                } #${helpRequest.id}`}
            />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Request Information Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <CardTitle className="text-2xl flex items-center">
                                    {translations.help_request_information ||
                                        "Help Request Information"}
                                </CardTitle>
                            </div>
                            <CardDescription>
                                {translations.details_about_support_request ||
                                    "Details about the support request"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Use DetailItem component */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <DetailItem
                                    icon={User}
                                    label={
                                        translations.requested_by ||
                                        "Requested By"
                                    }
                                >
                                    {helpRequest.user?.name}
                                </DetailItem>
                                <DetailItem
                                    icon={Calendar}
                                    label={
                                        translations.date_requested ||
                                        "Date Requested"
                                    }
                                >
                                    {formatDate(helpRequest.created_at)}
                                </DetailItem>
                            </div>

                            <Separator />

                            {/* Description */}
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        {translations.description ||
                                            "Description"}
                                    </p>
                                    <div className="prose prose-sm dark:prose-invert max-w-none bg-muted p-4 rounded-md">
                                        <p>
                                            {helpRequest.description ||
                                                translations.no_description_provided ||
                                                "No description provided."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center">
                                <Package className="mr-2 h-5 w-5 text-primary" />
                                {translations.product_information ||
                                    "Product Information"}
                            </CardTitle>
                            <CardDescription>
                                {translations.details_about_related_product ||
                                    "Details about the related product"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Use DetailItem component */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <DetailItem
                                    icon={Package}
                                    label={
                                        translations.product_name ||
                                        "Product Name"
                                    }
                                >
                                    {helpRequest.product?.name}
                                </DetailItem>
                                <DetailItem
                                    icon={Barcode}
                                    label={
                                        translations.serial_number ||
                                        "Serial Number"
                                    }
                                >
                                    {helpRequest.product?.serial_number}
                                </DetailItem>
                                <DetailItem
                                    icon={Building2}
                                    label={translations.supplier || "Supplier"}
                                >
                                    {helpRequest.product?.supplier}
                                </DetailItem>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
