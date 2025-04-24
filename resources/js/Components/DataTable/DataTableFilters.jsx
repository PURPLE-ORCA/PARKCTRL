// DataTableFilters.jsx
import React, { useContext } from "react"; // <-- Import useContext
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TranslationContext } from "@/context/TranslationProvider"; // <-- Import TranslationContext

const DataTableFilters = ({
    form,
    onSearch,
    onResetFilters,
    sortOptions = [], // Expect labels to be translated where used
    searchPlaceholder = "Search...", // Keep default, allow override
    extraFilters = null,
}) => {
    const { translations } = useContext(TranslationContext); // <-- Get translations

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(); // Assuming onSearch triggers the form submission/GET request
    };

    return (
        <div className="bg-white dark:bg-background rounded-lg shadow-sm p-4 mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1">
                        <label
                            htmlFor="search"
                            className="text-sm font-medium mb-1 block"
                        >
                            {/* Using generic search label */}
                            {translations.search_label || "Search"}{" "}
                            {/* <-- New key */}
                        </label>
                        <div className="relative">
                            <Input
                                id="search"
                                type="text"
                                // Use passed placeholder or generic translated one
                                placeholder={
                                    searchPlaceholder ||
                                    translations.search_placeholder_generic ||
                                    "Search..."
                                }
                                value={form.data.search}
                                onChange={(e) =>
                                    form.setData("search", e.target.value)
                                }
                                className="w-full pl-10"
                            />
                            <Icon
                                icon="mdi:magnify"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Sort By */}
                    <div className="w-full md:w-64">
                        <label
                            htmlFor="sort_by"
                            className="text-sm font-medium mb-1 block"
                        >
                            {translations.sort_by_label || "Sort By"}{" "}
                            {/* <-- New key */}
                        </label>
                        <Select
                            id="sort_by"
                            value={form.data.sort_by}
                            onValueChange={(value) => {
                                form.setData("sort_by", value);
                                // Optionally trigger search/filter on change
                                // onSearch();
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        translations.sort_by_placeholder ||
                                        "Sort by..."
                                    }
                                />{" "}
                                {/* <-- New key */}
                            </SelectTrigger>
                            <SelectContent>
                                {/* Expect sortOptions labels to be translated */}
                                {sortOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Order */}
                    <div className="w-full md:w-64">
                        <label
                            htmlFor="sort_order"
                            className="text-sm font-medium mb-1 block"
                        >
                            {translations.sort_order_label || "Sort Order"}{" "}
                            {/* <-- New key */}
                        </label>
                        <Select
                            id="sort_order"
                            value={form.data.sort_order}
                            onValueChange={(value) => {
                                form.setData("sort_order", value);
                                // Optionally trigger search/filter on change
                                // onSearch();
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        translations.sort_order_placeholder ||
                                        "Sort order..."
                                    }
                                />{" "}
                                {/* <-- New key */}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">
                                    {translations.sort_ascending || "Ascending"}
                                </SelectItem>{" "}
                                {/* <-- New key */}
                                <SelectItem value="desc">
                                    {translations.sort_descending ||
                                        "Descending"}
                                </SelectItem>{" "}
                                {/* <-- New key */}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Extra Filters (if provided) */}
                {extraFilters && <div className="pt-2">{extraFilters}</div>}

                <div className="flex justify-between pt-2 border-none dark:border-none">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onResetFilters}
                        disabled={form.processing}
                    >
                        <Icon icon="mdi:refresh" className="mr-2 w-5 h-5" />
                        {/* Using existing key from previous example */}
                        {translations.reset_filters_button || "Reset Filters"}
                    </Button>

                    <Button type="submit" disabled={form.processing}>
                        <Icon icon="mdi:filter" className="mr-2 w-5 h-5" />
                        {translations.apply_filters_button ||
                            "Apply Filters"}{" "}
                        {/* <-- New key */}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DataTableFilters;
