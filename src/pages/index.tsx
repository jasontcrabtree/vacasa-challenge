import { Header } from "@/components/Header";
import RepositoryList from "@/components/RepositoryList";
import { InferGetServerSidePropsType } from "next";

export default function Home({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log('repositoryData', data);

  return (
    <main>
      <Header>Repositories</Header>
      <RepositoryList items={data} />
    </main>
  );
}

export const getServerSideProps = async () => {

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const repositoryData = await fetch(`${baseUrl}/api/repositories`)
    .then((res) => res.json())
    .then((data) => data);

  console.log('repositoryData', repositoryData)

  return {
    props: {
      data: repositoryData
    }
  }
}