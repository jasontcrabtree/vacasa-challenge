import { Header } from "@/components/Header";
import RepositoryList from "@/components/RepositoryList";
import { InferGetServerSidePropsType } from "next";

export default function Home({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <Header>Repositories</Header>
      <RepositoryList items={data.items} />
    </main>
  );
}

export const getServerSideProps = async ({ query }: { query: { search: string } }) => {
  const repositoryApiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/repositories?search=${query.search || 'vacasa'}`);

  if (!repositoryApiRes.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return {
    props: {
      data: await repositoryApiRes.json()
    }
  }
}