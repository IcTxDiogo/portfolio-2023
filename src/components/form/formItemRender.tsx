import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormItemRenderProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues>;
    name: Path<TFormValues>;
    label: string;
    description?: string;
    renderItem: (field: FieldValues) => ReactNode;
};

export default function FormItemRender<TFormValues extends FieldValues>({
    form,
    name,
    label,
    description,
    renderItem,
}: FormItemRenderProps<TFormValues>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>{renderItem(field)}</FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage className={"text-xs"} />
                </FormItem>
            )}
        />
    );
}
