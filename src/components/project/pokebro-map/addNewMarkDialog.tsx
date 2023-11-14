import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
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

const formSchema = z.object({
    name: z.string().min(3),
    posX: z.coerce.number(),
    posY: z.coerce.number(),
    floor: z.coerce.number(),
    information: z.string(),
    type: z.string(),
});

export default function AddNewMarkDialog() {
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size={"icon"}>
                        <Plus />
                    </Button>
                </DialogTrigger>
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
