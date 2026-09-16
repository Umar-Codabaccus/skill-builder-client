import { http, HttpResponse } from "msw";

export const handlers = [
    http.post('/api/Authentication/login', (resolver) => {
        
    })
];