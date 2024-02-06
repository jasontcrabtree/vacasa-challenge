import { Header } from "@/components/Header";
import RepositoryList from "@/components/RepositoryList";
import { InferGetServerSidePropsType } from "next";
import styles from '@/styles/index.module.css'
import Link from "next/link";

export default function Home({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className={styles.layout}>
      <Header>Repositories</Header>
      <p>
        Add a "search" query param to search different repositories. Get started with <Link href="?search=nasa">NASA</Link>, <Link href="?search=vacasaoss">VacasaOSS</Link>, or <Link href="?search=reactjs">ReactJS.</Link> Defaults to the Vacasa GitHub Org.
      </p>
      {data ? (
        <RepositoryList items={data.items} />
      ) : (<p>
        No results found for search term
      </p>)}
    </main>
  );
}

export const getServerSideProps = async ({ query }: { query: { search: string } }) => {
  const repositoryApiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/repositories?search=${query.search || "vacasa"}`);

  if (repositoryApiRes.status === 422) {
    return {
      props: {
        data: null
      }
    }
  }

  if (!repositoryApiRes.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return {
    props: {
      data: await repositoryApiRes.json()
    }
  }
}