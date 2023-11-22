import { type ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

export const metadata = {
    title: "PokeBro Map",
    description: "A map of PokeBro ot server",
    icons: [{ rel: "icon", url: "/pokebro-map/favicon.png" }],
};

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}
