import React, { useState, useContext } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import { Menu, ChevronDown, LogOut, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggler from "@/Components/ThemeToggler";
import { TranslationContext } from "@/context/TranslationProvider";

const Navbar = ({ pendingCount = 0 }) => {
    const { auth } = usePage().props;
    const user = auth.user;
    const is_admin = auth?.abilities?.is_admin;
    const is_employee = auth?.abilities?.is_employee;

    // Ensure mainNavItems uses 'key' for translations and mapping
    const mainNavItems = [
        {
            key: "dashboard",
            icon: "material-symbols:dashboard",
            route: "dashboard",
        },
        ...(is_admin
            ? [
                  {
                      key: "users",
                      icon: "material-symbols:person",
                      route: "users.index",
                  },
                  {
                      key: "services",
                      icon: "material-symbols:home-repair-service",
                      children: [
                          { key: "all_services", route: "services.index" },
                          { key: "add_service", route: "services.create" },
                      ],
                  },
                  {
                      key: "products",
                      icon: "material-symbols:inventory-2",
                      children: [
                          { key: "all_products", route: "products.index" },
                          { key: "add_product", route: "products.create" },
                      ],
                  },
                  {
                      key: "interventions",
                      icon: "la:screwdriver",
                      children: [
                          {
                              key: "all_help_requests",
                              route: "help-requests.index",
                          },
                          {
                              key: "request_help",
                              route: "help-requests.create",
                          },
                      ],
                  },
              ]
            : []),
        ...(is_employee && !is_admin // Only add for employee if they are NOT also an admin
            ? [
                  {
                      key: "products",
                      icon: "material-symbols:inventory-2",
                      route: "products.index",
                  },
                  {
                      key: "request_help",
                      icon: "la:screwdriver",
                      route: "help-requests.create",
                  },
              ]
            : []),
    ];

    const getInitials = (name) => {
        if (!name) return "?"; // Handle cases where name might be missing
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    const { translations, switchLanguage } = useContext(TranslationContext);
    const lang = localStorage.getItem("lang") || "fr";
    const locals = [
        {
            locale: "fr",
            flag: "france.png", // You might need to adjust how flags are displayed or imported
            label: "Français",
        },
        {
            locale: "ar",
            flag: "saudi-arabia.png", // You might need to adjust how flags are displayed or imported
            label: "العربية",
        },
    ];

    return (
        <nav className="border-b bg-background sticky top-0 z-50">
            {" "}
            {/* Added sticky and z-index */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {" "}
                {/* Adjusted padding */}
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            {" "}
                            {/* Added gap */}
                            <Icon
                                icon="fluent:control-button-24-filled"
                                className="h-6 w-6 text-foreground" // Use foreground color
                            />
                            <span className="font-semibold text-xl text-foreground">
                                PARKCTRL
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        {mainNavItems.map((item) =>
                            item.children ? (
                                <DropdownMenu key={item.key}>
                                    {" "}
                                    {/* Use key */}
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-1 text-sm px-3" // Adjusted padding
                                        >
                                            <Icon
                                                icon={item.icon}
                                                className="h-4 w-4" // Removed mr-1, rely on gap
                                            />
                                            {translations[item.key] || item.key}
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start" // Changed alignment
                                        className="w-48"
                                    >
                                        {item.children.map((child) => (
                                            <DropdownMenuItem
                                                key={child.key} // Use key
                                                asChild
                                                className={
                                                    route().current(child.route)
                                                        ? "bg-muted"
                                                        : ""
                                                } // Active style
                                            >
                                                <Link
                                                    href={route(child.route)}
                                                    className="w-full cursor-pointer"
                                                >
                                                    {translations[child.key] ||
                                                        child.key}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    key={item.key} // Use key
                                    variant="ghost"
                                    asChild
                                    className={`text-sm px-3 ${
                                        // Adjusted padding
                                        route().current(item.route)
                                            ? "bg-muted font-semibold" // Active style
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href={route(item.route)}
                                        className="flex items-center gap-1.5" // Adjusted gap
                                    >
                                        <Icon
                                            icon={item.icon}
                                            className="h-4 w-4"
                                        />
                                        {translations[item.key] || item.key}
                                    </Link>
                                </Button>
                            )
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {" "}
                        {/* Adjusted gap */}
                        <ThemeToggler />
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon" // Make it icon size
                                    >
                                        <Icon
                                            icon="fa-solid:language"
                                            className="h-4 w-4"
                                        />
                                        <span className="sr-only">
                                            Change Language
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40" // Slightly narrower
                                >
                                    {locals.map((pay) => (
                                        <DropdownMenuItem
                                            key={pay.locale}
                                            onClick={() =>
                                                switchLanguage(pay.locale)
                                            }
                                            className={`flex justify-between items-center cursor-pointer ${
                                                pay.locale === "ar"
                                                    ? "font-arabic" // Ensure font-arabic is defined in your CSS
                                                    : ""
                                            }`}
                                        >
                                            <span>{pay.label}</span>
                                            {pay.locale === lang && (
                                                <Icon
                                                    icon="fa-solid:check"
                                                    className="h-3 w-3 text-primary" // Use primary color
                                                />
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {/* User Menu (Desktop) */}
                        <div className="hidden md:flex">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2 px-2" // Adjusted padding
                                    >
                                        <Avatar className="h-8 w-8">
                                            {/* Add AvatarImage if available */}
                                            <AvatarFallback>
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium hidden lg:inline">
                                            {" "}
                                            {/* Hide on md, show on lg */}
                                            {user.name.split(" ")[0]}
                                        </span>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <div className="px-4 py-3">
                                        <p className="text-sm font-semibold">
                                            {" "}
                                            {/* Added font-semibold */}
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("profile.edit")}
                                            className="flex items-center w-full cursor-pointer"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>
                                                {translations.settings ||
                                                    "Settings"}
                                            </span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" // Destructive style
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>
                                                {translations.logout ||
                                                    "Log out"}
                                            </span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">
                                            Open Menu
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-[300px] sm:w-[350px] p-0 flex flex-col" // Remove padding, add flex
                                >
                                    {/* User Profile in Mobile Menu */}
                                    <div className="flex items-center p-4 border-b gap-3">
                                        {" "}
                                        {/* Use gap */}
                                        <Avatar className="h-10 w-10">
                                            {/* Add AvatarImage if available */}
                                            <AvatarFallback>
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="overflow-hidden">
                                            {" "}
                                            {/* Prevent text overflow */}
                                            <p className="font-semibold truncate">
                                                {" "}
                                                {/* Truncate */}
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mobile Navigation */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                        {" "}
                                        {/* Add padding and scroll */}
                                        {mainNavItems.map((item) =>
                                            item.children ? (
                                                // Consider using Accordion for nested items on mobile
                                                <div
                                                    key={item.key}
                                                    className="space-y-1"
                                                >
                                                    <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                        <Icon
                                                            icon={item.icon}
                                                            className="h-4 w-4"
                                                        />
                                                        {translations[
                                                            item.key
                                                        ] || item.key}
                                                    </div>
                                                    <div className="pl-4 space-y-1">
                                                        {item.children.map(
                                                            (child) => (
                                                                <Link
                                                                    key={
                                                                        child.key
                                                                    }
                                                                    href={route(
                                                                        child.route
                                                                    )}
                                                                    className={`block px-3 py-1.5 text-sm rounded-md ${
                                                                        route().current(
                                                                            child.route
                                                                        )
                                                                            ? "bg-primary/10 text-primary font-medium" // Active style
                                                                            : "hover:bg-muted"
                                                                    }`}
                                                                >
                                                                    {translations[
                                                                        child
                                                                            .key
                                                                    ] ||
                                                                        child.key}
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    key={item.key}
                                                    href={route(item.route)}
                                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                                                        route().current(
                                                            item.route
                                                        )
                                                            ? "bg-primary/10 text-primary" // Active style
                                                            : "hover:bg-muted"
                                                    }`}
                                                >
                                                    <Icon
                                                        icon={item.icon}
                                                        className="h-5 w-5"
                                                    />
                                                    {translations[item.key] ||
                                                        item.key}
                                                </Link>
                                            )
                                        )}
                                    </div>

                                    {/* Bottom Actions */}
                                    <div className="border-t p-4 space-y-1">
                                        <Link
                                            href={route("profile.edit")}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                                        >
                                            <Settings className="h-4 w-4" />
                                            {translations.settings ||
                                                "Settings"}
                                        </Link>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-destructive focus:bg-destructive/10"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            {translations.logout || "Log out"}
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
