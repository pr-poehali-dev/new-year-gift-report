import {useEffect, useState, type ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import appCss from "@/index.css?url";
import {SiteTextsProvider, fetchSiteTexts} from "@/hooks/useSiteTexts";
import EditModeBar from "@/components/EditModeBar";
import VisitTracker from "@/components/VisitTracker";
import NotFound from "@/pages/NotFound";
import {installServerWatcher} from "@/lib/serverStatus";

const TITLE = "Сладкие новогодние подарки 2027 в Чебоксарах — оптом и в розницу | ЧебПодарки";
const DESCRIPTION =
    "Новогодние сладкие подарки от 590 ₽ в Чебоксарах: конфеты в праздничной упаковке для детей, школ, садов и сотрудников. Корпоративные заказы с логотипом, доставка по России.";
const OG_IMAGE =
    "https://cdn.poehali.dev/projects/***/files/ffc70d06-2ecc-4118-a570-1e0b6d74e314.jpg";

const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "ЧебПодарки",
    url: "https://chebpodarki.ru/",
    description:
        "Сладкие новогодние подарки оптом и в розницу: для детей, сотрудников и партнёров. Корпоративные заказы с логотипом и доставкой.",
    image: OG_IMAGE,
    telephone: "+7 927 843-67-27",
    email: "chebpodarki@yandex.ru",
    priceRange: "от 590 ₽",
    currenciesAccepted: "RUB",
    address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Петрова, 6/3",
        addressLocality: "Чебоксары",
        addressRegion: "Чувашская Республика",
        addressCountry: "RU",
    },
    areaServed: "RU",
};

const METRIKA = `(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(101026698, "init", { trustedDomains: ["poehali.dev"], clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, trackHash: true });`;

export const Route = createRootRoute({
    loader: async () => ({texts: await fetchSiteTexts()}),
    staleTime: Infinity,
    shouldReload: false,
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {
                name: "keywords",
                content:
                    "новогодние подарки, сладкие подарки, новогодние подарки Чебоксары, сладкие подарки оптом, корпоративные новогодние подарки, подарки для детей на новый год, подарки сотрудникам, конфеты в подарочной упаковке",
            },
            {name: "robots", content: "index, follow"},
            {property: "og:url", content: "https://chebpodarki.ru/"},
            {name: "geo.region", content: "RU-CU"},
            {name: "geo.placename", content: "Чебоксары"},
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:site_name", content: "ЧебПодарки"},
            {property: "og:title", content: TITLE},
            {property: "og:description", content: DESCRIPTION},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:alt", content: "Сладкие новогодние подарки ЧебПодарки"},
            {name: "twitter:card", content: "summary_large_image"},
            {
                name: "twitter:title",
                content:
                    "Сладкие новогодние подарки 2027 в Чебоксарах — купить оптом и в розницу | ЧебПодарки",
            },
            {
                name: "twitter:description",
                content:
                    "Новогодние сладкие подарки от 590 ₽ в Чебоксарах: конфеты в праздничной упаковке для детей, сотрудников и партнёров. Корпоративные заказы от 50 шт., логотип на упаковке, доставка по России. Звоните: +7 927 843-67-27.",
            },
            {name: "twitter:image", content: OG_IMAGE},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "icon", type: "image/svg+xml", href: "/favicon.svg"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON.stringify(JSON_LD)},
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    const [queryClient] = useState(() => new QueryClient());
    const {texts} = Route.useLoaderData();

    useEffect(() => {
        installServerWatcher();
    }, []);

    return (
        <RootDocument>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <SiteTextsProvider initial={texts}>
                        <Outlet/>
                        <EditModeBar/>
                        <VisitTracker/>
                    </SiteTextsProvider>
                </TooltipProvider>
            </QueryClientProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/101026698" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
