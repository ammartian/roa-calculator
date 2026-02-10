"use client";

import { useLanguage } from "@/lib/i18n/context";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="w-full mt-12 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
        </footer>
    );
}