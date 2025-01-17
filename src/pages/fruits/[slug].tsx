// pages/fruits/[slug].tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface FruitProps {
  fruit: {
    title: string;
    description: string;
    imageUrl: string;
  };
}

const FruitPage: React.FC<FruitProps> = ({ fruit }) => {
  if (!fruit) {
    return <h1>404 - Fruit not found</h1>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Head>
        <title>{fruit.title}</title>
        <meta name="description" content={fruit.description} />
      </Head>
      <h1>{fruit.title}</h1>
      <p>{fruit.description}</p>
      <Image
        src={fruit.imageUrl}
        alt={fruit.title}
        width={300}
        height={300}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default FruitPage;

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  // Map slug to specific photo IDs (example mapping)
  const fruitMapping: Record<string, number> = {
    apple: 1,
    banana: 2,
    semangka: 3, // Example ID
  };

  const photoId = fruitMapping[slug as string];

  if (!photoId) {
    return {
      notFound: true, // Return 404 if slug is invalid
    };
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );
    const data = await response.json();

    return {
      props: {
        fruit: {
          title: data.title,
          description: `Enjoy our fresh and delicious ${slug}!`,
          imageUrl: data.url,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
