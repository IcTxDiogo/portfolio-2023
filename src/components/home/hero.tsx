import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <div
            className={
                "bg-constellation-bg flex h-[93vh] items-center justify-center bg-constellation"
            }
        >
            <div className="flex flex-col items-center justify-center px-4 sm:flex-row-reverse">
                <Image
                    src="https://i.imgur.com/iF3vs2l.jpg"
                    className="max-w-sm rounded-full shadow-2xl"
                    width={300}
                    height={300}
                    alt=""
                />
                <div className="py-10 sm:px-2 lg:px-10">
                    <h1 className="text-5xl font-bold">{"Hi I'm Diogo"}</h1>
                    <p className="max-w-md py-6">
                        {
                            "A full-stack lover and a passionate about technology, I'm currently work full time and try to learning everything I can on my job and by doing side projects ."
                        }
                    </p>
                    <Link href="">
                        <Button className="text-lg font-semibold">
                            Take a look at my projects
                            <ArrowRight />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
