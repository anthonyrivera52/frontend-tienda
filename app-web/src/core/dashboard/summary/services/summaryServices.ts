import { TokenService } from "@/core/auth/tokenService";
import { Summary } from "../lib/types";


export class SummaryService {
    private tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    async getSummary(): Promise<{ summary: Summary } | null> {
        let error = false;
        let summaryData = null;
        try {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            
            if (!storedAccessToken || !storedRefreshToken) {
                console.log('No hay tokens almacenados');
                return null;
            }
            
            const response = await fetch('api/dashboard/summary', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error('Error al obtener los datos del resumen');
            }

            summaryData = response.json();
        } catch(error) {
            console.log(error);
            error = true;
        } finally {
            if (error) {
                throw('error');
            }
            return summaryData;
        }
    } 
}