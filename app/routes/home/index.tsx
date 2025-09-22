import type { Route } from "./+types/index";
import Hero from "~/components/Hero";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "RC Dev site | Welcome" },
        { name: "description", content: "Custom portfolio site development" },
    ];
}

export default function Home() {
    return (
        <section>
            <Hero name={'Sergii'}/>
        </section>
    );
}
