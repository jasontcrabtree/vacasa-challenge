import Accordion from "@/components/Accordion";
import { Header } from "@/components/Header";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import styles from '@/styles/settings.module.css'

export default function Settings({
    accordionContent
}: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <main className={styles.layout}>
            <Header>Settings</Header>

            <div className={styles.infoBox}>
                <Image
                    className={styles.logo}
                    src="https://avatars.githubusercontent.com/u/52792401?s=200&v=4"
                    alt="Vacasa OSS"
                    width={100}
                    height={100} />
                <div className={styles.infoContent}>
                    <p className="text-large">Vacasa Interview</p>
                    <a href="mailto:vacasa.interview@vacasa.com">
                        vacasa.interview@vacasa.com
                    </a>
                </div>
            </div>

            <div className={styles.supportWrapper}>
                <Header level="h2">Support</Header>
                <Accordion accordionContent={accordionContent} />
            </div>
        </main>
    );
}

export const getServerSideProps = async () => {
    const faqData = [
        {
            id: 'privacyPolicy',
            title: 'Privacy Policy',
            content: 'This is the privacy policy'
        },
        {
            id: 'termsOfService',
            title: 'Terms of Service',
            content: 'This is the terms of service'
        }
    ];

    return {
        props: {
            accordionContent: faqData
        }
    }
}