import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <>
            <div>{"home"}</div>
            <Link href={"/example-page"}>
                <Button variant={"ghost"}>{"Go to example page"}</Button>
            </Link>
        </>
    );
}
