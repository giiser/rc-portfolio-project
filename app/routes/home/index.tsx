import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "RC Dev site | Welcome" },
        { name: "description", content: "Custom portfolio site development" },
    ];
}

export default function Home() {
    return (
        <>
        </>
    );
}
