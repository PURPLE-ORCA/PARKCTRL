// QuickAccessBar.jsx
import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TranslationContext } from "@/context/TranslationProvider";
import { Plus, CirclePlus, Play, HelpCircle } from "lucide-react";

// Enhanced QuickAccessLink component using shadcn styling
const QuickAccessLink = ({ to, icon, label, variant = "outline" }) => {
    // Map the string icon names to Lucide components
    const getIcon = (iconName) => {
        switch (iconName) {
            case "mdi:plus-box":
                return <Plus className="h-5 w-5" />;
            case "mdi:plus-circle":
                return <CirclePlus className="h-5 w-5" />;
            case "mdi:play-circle-outline":
                return <Play className="h-5 w-5" />;
            case "mdi:help-circle-outline":
                return <HelpCircle className="h-5 w-5" />;
            default:
                return null;
        }
    };

    return (
        <a href={to} className="no-underline group">
            <div
                className={`
        flex flex-col items-center justify-center p-4 rounded-lg border-2 
        border-muted bg-background hover:border-primary hover:bg-accent 
        transition-all duration-200 h-24 w-24 sm:h-28 sm:w-28
      `}
            >
                <div className="text-muted-foreground group-hover:text-primary mb-2">
                    {getIcon(icon)}
                </div>
                <span className="text-sm text-center font-medium">{label}</span>
            </div>
        </a>
    );
};

// Enhanced QuickAccessBar component
const QuickAccessBar = () => {
    const { translations } = useContext(TranslationContext);

    return (
        <Card className="w-full bg-none border-none shadow-none">
            <CardContent className="pt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
                    <QuickAccessLink
                        to="/products/create"
                        icon="mdi:plus-box"
                        label={translations?.create_product || "Create Product"}
                    />
                    <QuickAccessLink
                        to="/services/create"
                        icon="mdi:plus-circle"
                        label={translations?.create_service || "Create Service"}
                    />
                    <QuickAccessLink
                        to="/actions/create"
                        icon="mdi:play-circle-outline"
                        label={translations?.action_create || "Create Action"}
                    />
                    <QuickAccessLink
                        to="/help-requests/create"
                        icon="mdi:help-circle-outline"
                        label={translations?.request_help || "Request Help"}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default QuickAccessBar;
