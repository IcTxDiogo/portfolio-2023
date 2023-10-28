import { randomUUID } from "crypto";

import ShowProjects, { type Project } from "@/components/home/showProjects";

const projects: Project[] = [
    {
        id: randomUUID(),
        name: "Portfolio",
        description: "This portfolio was made using Next.js and TailwindCSS",
        url: "",
    },
];

export default function ProjectsPage() {
    return (
        <div className=" flex flex-col items-center">
            <div className="flex w-full max-w-3xl flex-col space-y-4 p-4">
                <h1 className="m-8 text-xl font-bold">
                    {"Here's some of my projects, I hope you can see what i can do!"}
                </h1>
                <ShowProjects projects={projects} />
            </div>
        </div>
    );
}
