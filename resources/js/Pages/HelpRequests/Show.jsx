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

    // Helper to get status badge variant and icon
    const getStatusAttributes = (status) => {
        switch (status) {
            case "pending":
                return {
                    variant: "warning",
                    Icon: Clock,
                    label: translations.pending || "Pending",
                };
            case "in_progress":
                return {
                    variant: "info",
                    Icon: Wrench,
                    label: translations.in_progress || "In Progress",
                };
            case "resolved":
                return {
                    variant: "success",
                    Icon: CheckCircle,
                    label: translations.resolved || "Resolved",
                };
            case "closed":
                return {
                    variant: "secondary",
                    Icon: XCircle,
                    label: translations.closed || "Closed",
                }; 
            default:
                return {
                    variant: "secondary",
                    Icon: AlertCircle,
                    label: status || "Unknown",
                };
        }
    };
    const statusAttributes = getStatusAttributes(helpRequest.status);

    // Helper to get action icon - Now returns Icon component directly
    const getActionIcon = (action) => {
        switch (
            action?.toLowerCase() // Add safe navigation
        ) {
            case "created":
                return (
                    <Package className="h-4 w-4 text-green-600 dark:text-green-500" />
                );
            case "updated":
            case "status_changed": 
                return (
                    <Activity className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                );
            case "resolved":
                return (
                    <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                );
            case "closed":
                return (
                    <XCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                );
            default:
                return <Activity className="h-4 w-4 text-muted-foreground" />;
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
                                <Badge
                                    variant={statusAttributes.variant}
                                    className="capitalize px-3 py-1 text-sm whitespace-nowrap"
                                >
                                    <statusAttributes.Icon className="mr-1.5 h-4 w-4" />
                                    {statusAttributes.label.replace("_", " ")}
                                </Badge>
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

                    {/* Action History Card */}
                    {helpRequest.product?.action_logs && ( 
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center">
                                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                                    {translations.action_history ||
                                        "Action History"}
                                </CardTitle>
                                <CardDescription>
                                    {translations.timeline_of_actions ||
                                        "Timeline of actions performed on this product"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {helpRequest.product.action_logs.length > 0 ? (
                                    <div className="relative space-y-4 max-h-96 overflow-y-auto p-1 -ml-1 scrollbar-thin scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
                                        {/* Timeline line */}
                                        <div className="absolute left-[21px] top-0 bottom-0 w-0.5 bg-border -z-10"></div>

                                        {helpRequest.product.action_logs.map(
                                            (log) => (
                                                <div
                                                    key={log.id}
                                                    className="flex items-start space-x-4 relative pl-1"
                                                >
                                                    {/* Timeline dot */}
                                                    <div className="z-10 flex-shrink-0 mt-1.5 w-8 h-8 rounded-full bg-background flex items-center justify-center border-2 border-border">
                                                        {getActionIcon(
                                                            log.action
                                                        )}
                                                    </div>
                                                    {/* Content */}
                                                    <div className="flex-grow bg-card p-3 rounded-md border hover:border-primary/20 transition-colors">
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                                                            <h4 className="font-semibold text-foreground text-sm capitalize">
                                                                {log.action?.replace(
                                                                    "_",
                                                                    " "
                                                                ) || "Action"}
                                                            </h4>
                                                            <span className="text-xs text-muted-foreground mt-1 sm:mt-0">
                                                                {formatDate(
                                                                    log.created_at
                                                                )}{" "}
                                                                by{" "}
                                                                {log.user
                                                                    ?.name ||
                                                                    "System"}
                                                            </span>
                                                        </div>
                                                        {log.details && ( // Only show details if they exist
                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                {log.details}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border rounded-md bg-muted">
                                        <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                        <p className="mt-4 text-muted-foreground">
                                            {translations.no_action_history ||
                                                "No action history available for this product."}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
}
