import fs from "fs/promises";
import Link from "next/link";
import path from "path/posix";

export default function Home({ products }: { products: any[] }) {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  console.log("re-generating...");

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/dummy-json.json"),
    "utf-8"
  );

  const { products } = JSON.parse(data);

  if (!products) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (products.length === 0) {
    return {
      noutFound: true,
    };
  }

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}
