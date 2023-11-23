"use client";

import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

type SignOutButtonProps = {
    session: Session | null;
    backUrl: string;
};

export default function UserSessionButton({ session, backUrl }: SignOutButtonProps) {
    async function handleSesion() {
        if (session) {
            await signOut();
        } else {
            await signIn("discord");
        }
    }
    return (
        <Button variant={"outline"} size={"icon"} onClick={handleSesion}>
            {session ? <LogOut /> : <LogIn />}
        </Button>
    );
}
