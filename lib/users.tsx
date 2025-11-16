export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    group: string;
}

export const users: User[] = [
    {
        id: 1,
        email: "raifhu@intelica.com",
        firstName: "RAIF",
        lastName: "HU",
        group: "RAIFHU",
    },
    {
        id: 2,
        email: "raifro@intelica.com",
        firstName: "RAIF",
        lastName: "RO",
        group: "RAIFRO",
    }
];
