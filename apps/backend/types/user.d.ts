export interface JwtUserPayload {
    token: "string",
    user: User
}

export interface User {
    id: "string",
    name: "string",
    email: "string",
}
