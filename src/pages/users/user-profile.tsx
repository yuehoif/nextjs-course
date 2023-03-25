import { GetServerSideProps } from "next";

export type UserProfileProps = {
  username: string;
};

export default function UserProfile({ username }: UserProfileProps) {
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: "MAX",
    },
  };
};
