import React, { useState, useContext } from "react";
import { TranslationContext } from "@/context/TranslationProvider";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Package, Users, AlertTriangle, DollarSign } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import Layout from "@/Layouts/Layout";
import { Link, usePage } from "@inertiajs/react";
import QuickAccessBar from "@/Components/QuickAccessBar";

export default function Dashboard({
    recentActions,
    helpRequests,
    lowStockItems, 
    topServices,
    userCount,
    stats,
}) {
    const [currentTab, setCurrentTab] = useState("overview");
    const { translations } = useContext(TranslationContext);
    const { auth } = usePage().props;
    const is_admin = auth?.abilities?.is_admin;

    const totalProducts = stats?.totalProducts || 0;
    const totalValue = stats?.totalValue || 0;
    const pendingHelpRequests = stats?.pendingHelpRequests || 0;
    const unreadNotifications = stats?.unreadNotifications || 0; 

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

    const getStatusTranslation = (status) => {
        const key = status?.toLowerCase().replace(" ", "_"); 
        return translations[key] || status?.replace("_", " ") || ""; 
    };

    const formatShowingTicketsText = () => {
        const template =
            translations.showing_of_tickets ||
            "Showing {shown} of {total} tickets";
        return template
            .replace("{shown}", helpRequests?.length || 0)
            .replace("{total}", stats?.totalHelpRequests || 0);
    };

    return (
        <Layout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                        {translations.inventory_dashboard ||
                            "Inventory Dashboard"}
                    </h1>
                </div>
                {is_admin && (
                    <div className="mb-8">
                        <QuickAccessBar />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                {translations.total_inventory ||
                                    "Total Inventory"}
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalProducts}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {translations.products_in_database ||
                                    "Products in database"}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                {translations.inventory_value ||
                                    "Inventory Value"}
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${totalValue.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {translations.total_product_value ||
                                    "Total product value"}
                            </p>
                        </CardContent>
                    </Card>

                    {is_admin && (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {translations.help_requests_card ||
                                            "Help Requests"}
                                    </CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {pendingHelpRequests}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {translations.open_support_tickets ||
                                            "Open support tickets"}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {translations.users_card || "Users"}
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {userCount}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {translations.active_system_users ||
                                            "Active system users"}
                                    </p>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                {is_admin && (
                    <Tabs
                        defaultValue="overview"
                        className="w-full"
                        onValueChange={setCurrentTab}
                    >
                        <TabsList className="grid grid-cols-4 md:w-fit">
                            <TabsTrigger value="overview">
                                {translations.overview || "Overview"}
                            </TabsTrigger>
                            <TabsTrigger value="inventory">
                                {translations.inventory || "Inventory"}
                            </TabsTrigger>
                            <TabsTrigger value="activities">
                                {translations.activities || "Activities"}
                            </TabsTrigger>
                            <TabsTrigger value="support">
                                {translations.support || "Support"}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Inventory by Service Chart */}
                                <Card className="col-span-1">
                                    <CardHeader>
                                        <CardTitle>
                                            {translations.inventory_by_service ||
                                                "Inventory by Service"}
                                        </CardTitle>
                                        <CardDescription>
                                            {translations.distribution_products_services ||
                                                "Distribution of products across services"}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-80">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={topServices || []} 
                                                    dataKey="count"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    label
                                                >
                                                    {(topServices || []).map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORS[
                                                                        index %
                                                                            COLORS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                {/* Recent Activity */}
                                <Card className="col-span-1">
                                    <CardHeader>
                                        <CardTitle>
                                            {translations.recent_activity ||
                                                "Recent Activity"}
                                        </CardTitle>
                                        <CardDescription>
                                            {translations.latest_inventory_actions ||
                                                "Latest inventory actions"}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-80 overflow-auto">
                                        <div className="space-y-4">
                                            {recentActions?.map((action) => (
                                                <div
                                                    key={action.id}
                                                    className="flex items-start space-x-4"
                                                >
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>
                                                            {action.user?.name?.charAt(
                                                                0
                                                            ) || "?"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium">
                                                            {action.user?.name}{" "}
                                                            <span className="text-muted-foreground">
                                                                {action.action}
                                                            </span>{" "}
                                                            {
                                                                action.product
                                                                    ?.name
                                                            }
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(
                                                                action.created_at
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Add message if no recent actions */}
                                            {!recentActions ||
                                                (recentActions.length === 0 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {translations.no_recent_activity ||
                                                            "No recent activity."}
                                                    </p>
                                                ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Low Price Items */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {translations.lowest_price_items ||
                                            "Lowest Price Items"}
                                    </CardTitle>
                                    <CardDescription>
                                        {translations.products_lowest_prices_inventory ||
                                            "Products with the lowest prices in inventory"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {lowStockItems?.length > 0 ? (
                                        <div className="space-y-2">
                                            {lowStockItems.map((item) => (
                                                <Alert key={item.id}>
                                                    <AlertTriangle className="h-4 w-4" />
                                                    <AlertTitle>
                                                        {item.name}
                                                    </AlertTitle>
                                                    <AlertDescription>
                                                        {translations.serial_number ||
                                                            "Serial"}
                                                        : {item.serial_number} |{" "}
                                                        {translations.price ||
                                                            "Price"}
                                                        : ${item.price}
                                                    </AlertDescription>
                                                </Alert>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">
                                            {translations.no_items_to_display ||
                                                "No items to display."}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="inventory" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {translations.inventory_value_trends ||
                                            "Inventory Value Trends"}
                                    </CardTitle>
                                    <CardDescription>
                                        {translations.monthly_inventory_value_changes ||
                                            "Monthly inventory value changes"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="h-80">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            data={stats?.inventoryTrend || []}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                                name={
                                                    translations.value ||
                                                    "Value"
                                                }
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#82ca9d"
                                                name={
                                                    translations.count ||
                                                    "Count"
                                                }
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {translations.top_suppliers ||
                                            "Top Suppliers"}
                                    </CardTitle>
                                    <CardDescription>
                                        {translations.products_by_supplier_breakdown ||
                                            "Products by supplier breakdown"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="h-80">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={stats?.supplierStats || []}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="supplier" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="count"
                                                fill="#8884d8"
                                                name={
                                                    translations.count ||
                                                    "Count"
                                                }
                                            />
                                            <Bar
                                                dataKey="value"
                                                fill="#82ca9d"
                                                name={
                                                    translations.value ||
                                                    "Value"
                                                }
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="activities" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {translations.activity_log ||
                                            "Activity Log"}
                                    </CardTitle>
                                    <CardDescription>
                                        {translations.recent_inventory_movements ||
                                            "Recent inventory movements and changes"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="h-96 overflow-auto">
                                    <div className="space-y-4">
                                        {recentActions?.map((action) => (
                                            <div
                                                key={action.id}
                                                className="flex items-start p-3 border rounded-md"
                                            >
                                                <div className="mr-4">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {action.user?.name?.charAt(
                                                                0
                                                            ) || "?"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <p className="font-medium">
                                                            {action.user?.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {new Date(
                                                                action.created_at
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm">
                                                        {/* Action verb translation might be needed */}
                                                        {action.action} -{" "}
                                                        {action.product?.name} (
                                                        {translations.serial_abbr ||
                                                            "S/N"}
                                                        :{" "}
                                                        {
                                                            action.product
                                                                ?.serial_number
                                                        }
                                                        )
                                                    </p>
                                                    {action.details && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {action.details}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {/* Add message if no recent actions */}
                                        {!recentActions ||
                                            (recentActions.length === 0 && (
                                                <p className="text-sm text-muted-foreground">
                                                    {translations.no_activity_log_entries ||
                                                        "No activity log entries found."}
                                                </p>
                                            ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        {translations.load_more_activities ||
                                            "Load More Activities"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="support" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    {/* Reusing help_requests_card key */}
                                    <CardTitle>
                                        {translations.help_requests_card ||
                                            "Help Requests"}
                                    </CardTitle>
                                    <CardDescription>
                                        {translations.current_product_support_tickets ||
                                            "Current product support tickets"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {helpRequests?.map((request) => (
                                            <div
                                                key={request.id}
                                                className="border rounded-md p-4"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {
                                                                request.product
                                                                    ?.name
                                                            }
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {translations.requested_by ||
                                                                "Requested by"}
                                                            :{" "}
                                                            {request.user?.name}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        className={
                                                            request.status ===
                                                            "resolved"
                                                                ? "bg-green-500"
                                                                : request.status ===
                                                                  "in_progress"
                                                                ? "bg-blue-500"
                                                                : request.status ===
                                                                  "pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-gray-500"
                                                        }
                                                    >
                                                        {/* Use helper for status translation */}
                                                        {getStatusTranslation(
                                                            request.status
                                                        )}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm">
                                                    {request.description}
                                                </p>
                                                <div className="mt-3 flex justify-between items-center">
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(
                                                            request.created_at
                                                        ).toLocaleString()}
                                                    </p>
                                                    <Link
                                                        href={route(
                                                            "help-requests.show",
                                                            request.id
                                                        )}
                                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                                                            request.status ===
                                                            "resolved"
                                                                ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" // Outline variant style
                                                                : "bg-primary text-primary-foreground hover:bg-primary/90" // Default variant style
                                                        }`}
                                                    >
                                                        {request.status ===
                                                        "resolved"
                                                            ? translations.view_details ||
                                                              "View Details"
                                                            : translations.respond ||
                                                              "Respond"}
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                        {/* Add message if no help requests */}
                                        {!helpRequests ||
                                            (helpRequests.length === 0 && (
                                                <p className="text-sm text-muted-foreground">
                                                    {translations.no_help_requests_found ||
                                                        "No help requests found."}
                                                </p>
                                            ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        {/* Use formatted string */}
                                        {formatShowingTicketsText()}
                                    </div>
                                    <Button variant="outline">
                                        {translations.view_all_tickets ||
                                            "View All Tickets"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </Layout>
    );
}
