import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

// Fetcher function for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PhotosPage: React.FC = () => {
  const { data: photos, error } = useSWR(
    "https://jsonplaceholder.typicode.com/photos?_limit=100",
    fetcher,
    {
      revalidateOnFocus: false,
      // refreshInterval: 1,
    }
  );

  if (error) {
    return <div>Error loading photos.</div>;
  }

  if (!photos) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Photo Gallery</title>
        <meta name="description" content="Browse a collection of photos" />
      </Head>
      <h1 style={{ textAlign: "center" }}>Photo Gallery</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {photos.map((photo: any) => (
          <div
            key={photo.id}
            style={{
              textAlign: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <Image
              src={`https://picsum.photos/id/${photo.id}/150/150`}
              alt={photo.title}
              width={150}
              height={150}
              style={{ borderRadius: "4px" }}
            />
            <h3 style={{ fontSize: "14px", margin: "10px 0" }}>
              {photo.title}
            </h3>
            <Link
              href={`/photos/${photo.id}`}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosPage;
