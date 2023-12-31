"use client";

import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { type Session } from "next-auth";

import { Button } from "@/components/ui/button";

type SignOutButtonProps = {
    session: Session | null;
};

export default function UserSessionButton({ session }: SignOutButtonProps) {
    async function handleSesion() {
        if (session) {
            await signOut();
        } else {
            await signIn("discord");
        }
    }
    return (
        <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleSesion}
            aria-label={session ? "Sign Out" : "Sign In"}
        >
            {session ? <LogOut /> : <LogIn />}
        </Button>
    );
}
