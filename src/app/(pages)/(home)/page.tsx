import { randomUUID } from "crypto";

import Hero from "@/components/home/hero";
import Technologies from "@/components/home/technologies";
import Motivations from "@/components/home/motivations";

export interface BaseTechnology {
    id: string;
    name: string;
    icon: string;
    description: string;
    externalUrl: string;
}

const baseTechnology: BaseTechnology[] = [
    {
        id: randomUUID(),
        name: "Typescript",
        icon: "https://i.imgur.com/1d8yRcQ.png",
        description:
            "Typescript is a superset of Javascript, adding types to the language, that helps us write more structured and error-free code by providing static type checking",
        externalUrl: "https://www.typescriptlang.org/",
    },
    {
        id: randomUUID(),
        name: "React",
        icon: "https://i.imgur.com/XoQtJi7.png",
        description:
            "React is a JavaScript library used for building user interfaces. It allows us to create reusable UI components and helps with managing the state of an application.",
        externalUrl: "https://react.dev/",
    },
    {
        id: randomUUID(),
        name: "Next.js",
        icon: "https://i.imgur.com/tYTlIPW.png",
        description:
            "Next.js is a framework for building react Server component. It provides a streamlined development experience and optimized performance with focus on less js on client.",
        externalUrl: "https://nextjs.org/",
    },
];

export default function Page() {
    return (
        <>
            <Hero />
            <Technologies technology={baseTechnology} />
            <Motivations />
        </>
    );
}
