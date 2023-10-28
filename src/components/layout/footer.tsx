import { LinkedinIcon, GithubIcon } from "lucide-react";
import Link from "next/link";

const size = 44;
const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="my-2 flex flex-col items-center border-t-2 border-border">
            <div className="flex justify-center gap-10 py-4">
                <Link href="{https://github.com/IcTxDiogo/}">
                    <GithubIcon size={size} />
                </Link>
                <Link href={"https://linkedin.com/in/diogofrancasantos/"}>
                    <LinkedinIcon size={size} />
                </Link>
            </div>
            <p className="text-base-content text-center text-lg">
                © {year} Diogo Santos. All rights reserved.
            </p>
        </footer>
    );
}
