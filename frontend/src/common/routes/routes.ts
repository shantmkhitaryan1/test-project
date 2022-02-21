import React from "react";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";

export interface RouteInterface {
    key: number;
    link: string;
    component: React.FC
}

export const route: RouteInterface[] = [
    {
        key: 1,
        link: '/',
        component: Login
    },
    {
        key: 2,
        link: '/sign-up',
        component: Registration
    }
]