import { environment } from "src/environments/environment";

export class AppConstants{
    static SHORT_URL_MAX_LENGTH: number = 7
    static getTrendingUrlsNoOfResult(): number{
        return 5;
    }
    static getAPIEndpoint(): string{
        return environment.API_ENDPOINT;
    }
    static getDomainName(): string{
        return environment.DOMAIN_SHORT_URL;
    }
}