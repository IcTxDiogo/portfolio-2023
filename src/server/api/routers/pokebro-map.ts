import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { pokebroMapMarker } from "@/server/db/schema";

export const pokebroMapRouter = createTRPCRouter({
    createMarker: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                posX: z.number(),
                posY: z.number(),
                floor: z.number(),
                information: z.string().min(1),
                type: z.string().min(1),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(pokebroMapMarker).values({
                name: input.name,
                posX: input.posX,
                posY: input.posY,
                floor: input.floor,
                information: input.information,
                type: input.type,
            });
        }),

    getCitiesMarkers: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.pokebroMapMarker.findMany({
            where: (marker, { eq }) => eq(marker.type, "city-name"),
        });
    }),
});