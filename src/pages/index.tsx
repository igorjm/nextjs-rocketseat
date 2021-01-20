import { GetServerSideProps } from "next";
import Link from "next/link";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";

import { Title } from "../styles/pages/Home";
import SEO from "@/components/SEO";

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your best choice"
        image=""
        shouldExcludeTitleSuffix
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  // );
  // const recommendedProducts = await response.json();

  //PRISMIC
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
