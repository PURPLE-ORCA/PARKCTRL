import React, { useContext } from "react"; 
import { useForm } from "@inertiajs/react";
import { TranslationContext } from "@/context/TranslationProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, SortAsc, SortDesc, Search, Filter } from "lucide-react";

const SearchFilterBar = ({
    routeName,
    initialFilters = {},
    searchPlaceholder = "Search...", 
    sortOptions = [], 
    filterOptions = [], 
    preserveState = true,
    preserveScroll = true,
    additionalControls = null,
}) => {
    const { translations } = useContext(TranslationContext); 

    const form = useForm({
        search: initialFilters.search || "",
        sort_by: initialFilters.sort_by || "",
        sort_order: initialFilters.sort_order || "desc",
        ...Object.fromEntries(
            filterOptions.map((filter) => [
                filter.name,
                initialFilters[filter.name] || "all",
            ])
        ),
    });

    const handleSearch = (e) => {
        e.preventDefault();
        form.get(route(routeName), {
            preserveScroll,
            preserveState,
        });
    };

    const handleSort = (sortBy) => {
        const newOrder =
            form.data.sort_by === sortBy && form.data.sort_order === "asc"
                ? "desc"
                : "asc";

        form.setData({
            ...form.data,
            sort_by: sortBy,
            sort_order: newOrder,
        });

        form.get(route(routeName), {
            preserveScroll,
            preserveState,
        });
    };

    const handleFilterChange = (name, value) => {
        form.setData(name, value);
        form.get(route(routeName), {
            preserveScroll,
            preserveState,
        });
    };

    const resetFilters = () => {
        const resetData = {
            search: "",
            sort_by: "",
            sort_order: "desc",
            ...Object.fromEntries(
                filterOptions.map((filter) => [filter.name, "all"])
            ),
        };

        form.setData(resetData);
        form.get(route(routeName), {
            preserveScroll,
            preserveState,
        });
    };

    const getFilterPlaceholder = (label) => {
        const template =
            translations.select_filter_placeholder || "Select {label}"; 
        return template.replace("{label}", label); 
    };

    return (
        <div className="w-full mb-6 space-y-4">
            <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row items-center gap-3"
            >
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder={
                            searchPlaceholder ||
                            translations.search_placeholder_generic ||
                            "Search..."
                        } // <-- New key
                        value={form.data.search}
                        onChange={(e) => form.setData("search", e.target.value)}
                        className="pl-9"
                    />
                    <Button
                        type="submit"
                        size="sm"
                        className="absolute right-1 top-1"
                    >
                        {translations.search_button || "Search"}{" "}
                        {/* <-- New key */}
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2 ml-auto">
                    {sortOptions.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    type="button"
                                >
                                    {form.data.sort_order === "asc" ? (
                                        <SortAsc size={16} />
                                    ) : (
                                        <SortDesc size={16} />
                                    )}
                                    {translations.sort_button || "Sort"}{" "}
                                    {/* <-- New key */}
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {/* sortOptions labels expected to be translated */}
                                {sortOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        className={`flex items-center justify-between ${
                                            form.data.sort_by === option.value
                                                ? "font-medium"
                                                : ""
                                        }`}
                                        onClick={() => handleSort(option.value)}
                                    >
                                        {option.label}
                                        {form.data.sort_by === option.value &&
                                            (form.data.sort_order === "asc" ? (
                                                <SortAsc size={16} />
                                            ) : (
                                                <SortDesc size={16} />
                                            ))}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {filterOptions.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    type="button"
                                >
                                    <Filter size={16} />
                                    {translations.filters_button ||
                                        "Filters"}{" "}
                                    {/* <-- New key */}
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {/* filterOptions labels expected to be translated */}
                                {filterOptions.map((filter) => (
                                    <div key={filter.name} className="p-2">
                                        <label className="text-sm font-medium mb-1 block">
                                            {filter.label}
                                        </label>
                                        <Select
                                            value={
                                                form.data[filter.name] || "all"
                                            }
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    filter.name,
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    // Use helper function for placeholder
                                                    placeholder={getFilterPlaceholder(
                                                        filter.label
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    {translations.filter_all ||
                                                        "All"}{" "}
                                                    {/* <-- New key */}
                                                </SelectItem>
                                                {/* filter.options labels expected to be translated */}
                                                {filter.options.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                                <div className="border-t p-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full"
                                        onClick={resetFilters}
                                        type="button"
                                    >
                                        {translations.reset_filters_button ||
                                            "Reset Filters"}{" "}
                                        {/* <-- New key */}
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </form>

            {/* Render additional controls outside the form */}
            {additionalControls && (
                <div className="flex justify-end">{additionalControls}</div>
            )}
        </div>
    );
};

export default SearchFilterBar;
