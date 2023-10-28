import { randomUUID } from "crypto";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export interface AboutCard {
    id: string;
    text: string;
    imageUrl: string;
}

const cards: AboutCard[] = [
    {
        id: randomUUID(),
        text: `I'm a 24 years old guy from Brazil, I'm currently studying computer engineering at UFGD.`,
        imageUrl: "https://i.imgur.com/dUbZ7iE.jpg",
    },
    {
        id: randomUUID(),
        text: `I always liked using the computer, starting with games, image and video editing, and now programming.`,
        imageUrl: "https://i.imgur.com/fy4z6mo.jpg",
    },
    {
        id: randomUUID(),
        text: `My first contact with programming was in high school, since that time, I don't remember a day that programming wasn't in my thoughts`,
        imageUrl: "https://i.imgur.com/t5rUtbY.jpg",
    },
    {
        id: randomUUID(),
        text: `My current focus learning all i can on my full-time job, and in my free time, I'm developing this portfolio. I'm always looking for new challenges and opportunities to learn and grow.`,
        imageUrl: "https://i.imgur.com/VyPhjnu.jpg",
    },
];

export default function AboutPage() {
    return (
        <>
            <main className="flex flex-col items-center">
                <h1 className="m-8 text-2xl font-bold">
                    {"Thanks to come here! I'm excited to share a little bit about me!"}
                </h1>
                <div className="m-4 flex flex-col space-y-4 ">
                    {cards.map((card) => (
                        <Card key={card.id} className="flex p-4 sm:max-w-3xl">
                            <div className="grid grid-cols-12 items-center">
                                <div className="col-span-4 flex justify-center sm:col-span-5">
                                    <Image
                                        className="rounded-xl p-2"
                                        src={card.imageUrl}
                                        alt="Album"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className="col-span-8 p-2 sm:col-span-7 sm:text-lg">
                                    {card.text}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
}
