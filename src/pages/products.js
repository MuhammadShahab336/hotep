import Head from 'next/head';
import Link from "next/link";
import prisma from '@/lib/prisma';
import withAuth from "@/components/withAuth";
import Product from '@/components/Product';

export default withAuth(function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Next.js</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

        <h1 className="text-6xl font-bold pb-5 text-center">
          Next.js Products
        </h1>

        <br />

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center  gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>

      </main>

      <footer></footer>
    </div>
  );
})

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  //convert decimal value to string to pass through as json
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));
  return {
    props: { products },
  };
}