import React from "react";

export type Accordion = {
    id: number;
    title: string;
    content: React.ReactNode | string
}