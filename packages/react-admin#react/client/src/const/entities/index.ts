export type Users = {
    id: number;
    name: string;
    password: string;
    email: string;
    gender: "Male" | "Female";
    address: string;
    phone: string;
    birthday: string;
}

export type Admin = {
    id: number;
    name: string;
    password: string;
    email: string;
    gender: "Male" | "Female";
    address: string;
    phone: string;
    birthday: string;
}


export type Goods = {
    id: number;
    name: string;
    price: string;
    type_id: string;
    description: string;
    img: string;
}