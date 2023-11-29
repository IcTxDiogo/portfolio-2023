import { useRouter } from "next/navigation";
import { z } from "zod";

import FormItemRender from "@/components/form/formItemRender";
import { DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";

const formSchema = z.object({
    name: z.string().min(3),
    posX: z.coerce.number(),
    posY: z.coerce.number(),
    floor: z.coerce.number(),
    information: z.string(),
    type: z.string(),
});

type AddNewMarkDialogFormProps = {
    clickPosition: { x: number; y: number; floor: number };
};

export default function AddNewMarkDialogForm({ clickPosition }: AddNewMarkDialogFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            posX: clickPosition.x,
            posY: clickPosition.y,
            floor: clickPosition.floor,
            information: "",
            type: "trails",
        },
    });
    const markCreate = api.pokebroMap.createMarker.useMutation();
    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        markCreate.mutate(values);
        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormItemRender
                    form={form}
                    name={"name"}
                    label={"Name"}
                    renderItem={(field) => <Input {...field} />}
                />
                <FormItemRender
                    form={form}
                    name={"posX"}
                    label={"Position X"}
                    renderItem={(field) => <Input {...field} type={"number"} />}
                />
                <FormItemRender
                    form={form}
                    name={"posY"}
                    label={"Position Y"}
                    renderItem={(field) => <Input {...field} type={"number"} />}
                />
                <FormItemRender
                    form={form}
                    name={"floor"}
                    label={"Floor"}
                    renderItem={(field) => <Input {...field} type={"number"} />}
                />
                <FormItemRender
                    form={form}
                    name={"information"}
                    label={"Information"}
                    renderItem={(field) => <Input {...field} />}
                />
                <FormItemRender
                    form={form}
                    name={"type"}
                    label={"Type"}
                    renderItem={(field) => <Input {...field} />}
                />

                <div className={"flex justify-end pt-4"}>
                    <DialogTrigger asChild>
                        <Button type="submit">Save changes</Button>
                    </DialogTrigger>
                </div>
            </form>
        </Form>
    );
}
