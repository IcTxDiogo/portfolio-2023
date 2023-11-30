import Image from "next/image";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type BaseTechnology } from "@/app/(pages)/(home)/page";

interface TechnologyProps {
    technology: BaseTechnology[];
}

export default function Technologies({ technology }: TechnologyProps) {
    return (
        <>
            <div className="m-4 flex flex-col items-center space-y-4">
                {technology.map((item) => (
                    <a key={item.id} href={item.externalUrl} target="_blank" rel="noreferrer">
                        <Card className="grid h-72 grid-cols-12 items-center sm:h-44 sm:max-w-3xl">
                            <div className="col-span-6 flex justify-center p-2 sm:col-span-2">
                                <Image src={item.icon} alt="icon" width={100} height={100}></Image>
                            </div>
                            <CardTitle className="col-span-6 flex justify-center text-2xl sm:col-span-2">
                                {item.name}
                            </CardTitle>
                            <CardContent className="col-span-12 sm:col-span-8">
                                {item.description}
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </>
    );
}
