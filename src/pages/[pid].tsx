import { GetStaticPropsContext } from "next";
import fs from "fs/promises";
import path from "path/posix";
import { ParsedUrlQuery } from "querystring";

export type Product = {
  id: string;
  title: string;
  description: string;
};

export type Products = {
  products: Product[];
};

interface Params extends ParsedUrlQuery {
  pid: string;
}

export type ProductDetailPageProps = {
  product: Product;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/dummy-json.json"),
    "utf-8"
  );

  const { products } = JSON.parse(data) as Products;

  const paths = products.map((product) => ({
    params: { pid: product.id },
  }));

  // const paths = [{ params: { pid: "p1" } }];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext<Product>) {
  const { pid } = context.params as unknown as Params;

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/dummy-json.json"),
    "utf-8"
  );

  const { products } = JSON.parse(data) as Products;

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

  const product = products.find((product) => product.id === pid);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
