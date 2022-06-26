import Layout from "../Components/Layout/Layout";
import '../styles/global.css';
import {I18nProvider} from "@lingui/react";
import {i18n} from "@lingui/core";
import {useRouter} from "next/router";
import {useEffect} from "react";
import { en, ru } from 'make-plural/plurals'

i18n.loadLocaleData('en', { plurals: en })
i18n.loadLocaleData('ru', { plurals: ru })

export default function App({ Component, pageProps }) {
    const { locale } = useRouter();

    useEffect(() => {
        async function load(locale: string = '') {
            const { messages } = await import(`../locale/${locale}/messages.po`)

            i18n.load(locale, messages)
            i18n.activate(locale)
        }

        load(locale)
    }, [locale])

    return (
        <I18nProvider i18n={i18n}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </I18nProvider>
    )
}