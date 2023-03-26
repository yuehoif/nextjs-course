import { GetStaticProps } from "next";
import useSWR, { Fetcher, SWRConfig } from "swr";

export type Sale = {
  id: string;
  username: string;
  volume: number;
};

export type Sales = Sale[];

export type FetchResponse = {
  [key: string]: {
    name: string;
    volume: number;
  };
};

export type SalesProps = {
  fallback: {
    [key: string]: Sales;
  };
};

const apiURL =
  "https://nextjs-course-cb036-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json";

function Sales() {
  const fetcher: Fetcher<Sales, string> = async (url) => {
    const response = await fetch(url);
    const data: FetchResponse = await response.json();
    const sales: Sales = Object.keys(data).map((key) => ({
      id: key,
      username: data[key].name,
      volume: data[key].volume,
    }));

    return sales;
  };

  const { data, error } = useSWR(apiURL, fetcher);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {data.map((sale) => (
          <li key={sale.id}>{`${sale.username} - ${sale.volume}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SalesPage({ fallback }: SalesProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <Sales />
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(apiURL);
  const data: FetchResponse = await response.json();
  const sales: Sales = Object.keys(data).map((key) => ({
    id: key,
    username: data[key].name,
    volume: data[key].volume,
  }));

  return {
    props: {
      fallback: {
        apiURL: sales,
      },
    },
  };
};
