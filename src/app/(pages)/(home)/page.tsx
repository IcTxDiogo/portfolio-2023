import Link from "next/link";

export default function Page() {
    return (
        <>
            <div>{"home"}</div>
            <Link href={"/example-page"}>Example Page</Link>
        </>
    );
}