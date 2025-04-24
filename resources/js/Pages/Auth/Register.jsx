import { useEffect } from "react"; // Import useEffect
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Your Layout
import GuestLayout from "@/Layouts/GuestLayout";

export default function Register() {
    const { services } = usePage().props; // Assuming services are passed correctly
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        service_id: "", // Ensure this matches the value type expected by Select (string)
    });

    // Reset password fields on component unmount or error clear (optional but good practice)
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register")); // No need for onFinish reset here if handled by useEffect
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Add vertical spacing to the form */}
            <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    {" "}
                    {/* Group label, input, error */}
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        autoFocus // Replaced isFocused
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        className={
                            errors.name
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                        } // Add error styling
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        className={
                            errors.email
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                        }
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        className={
                            errors.password
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                        }
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                        className={
                            errors.password_confirmation
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                        }
                    />
                    {errors.password_confirmation && (
                        <p className="text-sm text-destructive">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                {/* Service Select Field */}
                <div className="space-y-2">
                    <Label htmlFor="service_id">Service</Label>
                    <Select
                        // Use `value` directly with the string value from state
                        value={data.service_id}
                        // `onValueChange` receives the string value directly
                        onValueChange={(value) => setData("service_id", value)}
                        required // Add required attribute if applicable
                    >
                        <SelectTrigger
                            id="service_id" // Add id for label association
                            className={
                                errors.service_id
                                    ? "border-destructive focus-visible:ring-destructive"
                                    : ""
                            }
                        >
                            <SelectValue placeholder="Select your service" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Ensure services is an array before mapping */}
                            {Array.isArray(services) &&
                                services.map((service) => (
                                    <SelectItem
                                        key={service.id}
                                        // Ensure value is a string, as Select typically works with strings
                                        value={String(service.id)}
                                    >
                                        {service.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    {errors.service_id && (
                        <p className="text-sm text-destructive">
                            {errors.service_id}
                        </p>
                    )}
                </div>

                {/* Submission Area */}
                <div className="flex items-center justify-end space-x-4">
                    <Link
                        href={route("login")}
                        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    {/* Use Shadcn Button */}
                    <Button type="submit" disabled={processing}>
                        {processing ? "Registering..." : "Register"}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
