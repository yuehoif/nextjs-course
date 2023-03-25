import { GetServerSideProps } from "next";

export default function UserIdPage({ id }: { id: string }) {
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const userId = params?.uid;

  return {
    props: {
      id: "user-" + userId,
    },
  };
};
