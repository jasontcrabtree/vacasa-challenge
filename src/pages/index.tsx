import { Header } from "@/components/Header";
import RepositoryList from "@/components/RepositoryList";
import { InferGetServerSidePropsType } from "next";

export default function Home({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // console.log('CLIENT SIDE DATA', data);

  return (
    <main>
      <Header>Repositories</Header>
      {/* <RepositoryList items={data} /> */}
    </main>
  );
}

export const getServerSideProps = async ({ query }: { query: { search: string } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const repositoryApiRes = await fetch(`${baseUrl}/api/repositories?search=${query.search}`);

  if (!repositoryApiRes.ok) {
    throw new Error('Failed to fetch repositories');
  }

  const repositoryData = await repositoryApiRes.json();

  return {
    props: {
      data: repositoryData
    }
  }
}