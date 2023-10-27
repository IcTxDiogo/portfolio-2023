import { randomUUID } from "crypto";

import NavBar, { type MenuItem } from "@/components/layout/navBar";

const menuItem: MenuItem[] = [
    {
        id: randomUUID(),
        name: "Home",
        href: "/",
    },
    {
        id: randomUUID(),
        name: "Example Page",
        href: "/example-page",
    },
];

export default function Page() {
    return (
        <>
            <NavBar leftItem={"Portfolio"} items={menuItem} />
        </>
    );
}
