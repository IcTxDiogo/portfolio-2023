import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
}

type ShowProjectsProps = {
    projects: Project[];
};

export default function ShowProjects({ projects }: ShowProjectsProps) {
    return (
        <>
            {projects.map((project) => (
                <Link href={project.url} key={project.id}>
                    <Card className="p-4 hover:bg-primary/10">
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{project.description}</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </>
    );
}
