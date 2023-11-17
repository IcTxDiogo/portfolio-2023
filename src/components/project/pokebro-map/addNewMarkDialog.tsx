import { useForm } from "react-hook-form";
import { type ReactNode } from "react";
import { z } from "zod";

import FormItemRender from "@/components/form/formItemRender";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

const formSchema = z.object({
    name: z.string().min(3),
    posX: z.coerce.number(),
    posY: z.coerce.number(),
    floor: z.coerce.number(),
    information: z.string(),
    type: z.string(),
});

type addNewMarkDialogProps = {
    children: ReactNode;
    getMousePosition: (e: MouseEvent) => { x: number; y: number; floor: number };
};

export default function AddNewMarkDialog({ children, getMousePosition }: addNewMarkDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            posX: 0,
            posY: 0,
            floor: 0,
            information: "",
            type: "",
        },
    });

    const markCreate = api.pokebroMap.createMarker.useMutation();

    function handeMarkClick(e: MouseEvent) {
        const { x, y, floor } = getMousePosition(e);
        form.setValue("posX", x);
        form.setValue("posY", y);
        form.setValue("floor", floor);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        markCreate.mutate(values);
    }

    return (
        <>
            <Dialog>
                <ContextMenu>
                    <ContextMenuTrigger>{children}</ContextMenuTrigger>
                    <ContextMenuContent>
                        <DialogTrigger asChild>
                            <ContextMenuItem onClick={(e) => handeMarkClick(e.nativeEvent)}>
                                New mark here
                            </ContextMenuItem>
                        </DialogTrigger>
                    </ContextMenuContent>
                </ContextMenu>
                <DialogContent
                    className="sm:max-w-[425px]"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <DialogHeader>
                        <DialogTitle>New marker</DialogTitle>
                    </DialogHeader>
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
                                <Button type="submit">Save changes</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
