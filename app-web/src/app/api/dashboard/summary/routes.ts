import { Summary } from "@/core/dashboard/summary/lib/types";
import { getReadJSON } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<Summary[]> {
    let summaryResponse:Summary[] | any = null;
    try{
        try{
            if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== "") {
                // Si la variable de entorno está configurada, usar URL externa
                summaryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/users.json`) ;
            }else {
                console.log('Usando archivo local');
                // Si no está configurada, usar archivo local
                summaryResponse = await getReadJSON('summary.json');
            }
        } catch(error) {
            console.error(error);
            return summaryResponse;
        }
    } catch (error) {
        console.error(error);
        return summaryResponse;
    } finally {
        return summaryResponse
    }
}
