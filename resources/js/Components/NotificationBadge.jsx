import React, { useEffect, useState, useContext } from "react"; // <-- Import useContext
import { router } from "@inertiajs/react";
import { TranslationContext } from "@/context/TranslationProvider"; // <-- Import TranslationContext
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotificationBadge({ initialCount = 0 }) {
    const { translations } = useContext(TranslationContext); // <-- Get translations
    const [count, setCount] = useState(initialCount);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch(route("help-requests.pending-count"))
            .then((response) => response.json())
            .then((data) => setCount(data.count))
            .catch((error) =>
                console.error("Error fetching initial count:", error)
            ); 

        const interval = setInterval(() => {
            fetch(route("help-requests.pending-count"))
                .then((response) => {
                    if (!response.ok)
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    return response.json();
                })
                .then((data) => setCount(data.count))
                .catch((error) =>
                    console.error("Error fetching pending count:", error)
                ); 
        }, 30000); 

        return () => clearInterval(interval);
    }, []);

    // No user-facing text in this function
    const handleMarkAllAsRead = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        if (!csrfToken) {
            console.error("CSRF token not found");
            return; // Don't proceed if token is missing
        }

        fetch(route("help-requests.mark-as-read"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken, // Use the retrieved token
                Accept: "application/json", // Often helpful for API routes
            },
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                return response.json(); // Or response.text() if it doesn't return JSON
            })
            .then(() => setCount(0))
            .catch((error) => console.error("Error marking as read:", error)); // Add error handling
    };

    // No user-facing text in this function
    const navigateToHelpRequests = () => {
        router.visit(route("help-requests.index"));
        setIsOpen(false);
    };

    // Helper function for pluralization text
    const getPendingRequestsText = (num) => {
        if (num === 1) {
            const template =
                translations.pending_help_request_singular ||
                "You have {count} new help request pending."; // <-- New key
            return template.replace("{count}", num);
        } else {
            const template =
                translations.pending_help_requests_plural ||
                "You have {count} new help requests pending."; // <-- New key
            return template.replace("{count}", num);
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {count > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center rounded-full text-xs font-medium"
                        >
                            {count > 99 ? "99+" : count}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
                <div className="p-2">
                    <div className="space-y-1 mt-3 px-2">
                        {count > 0 ? (
                            <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
                                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                <p>{getPendingRequestsText(count)}</p>
                            </div>
                        ) : (
                            <div className="flex items-center text-sm text-gray-600 p-2">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                                <p>
                                    {translations.no_new_notifications ||
                                        "No new notifications."}
                                </p>{" "}
                            </div>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={navigateToHelpRequests}
                    className="flex items-center justify-center cursor-pointer py-2 text-black dark:text-white"
                >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {translations.view_all_help_requests ||
                        "View all help requests"}{" "}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
