import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import React from "react";
interface IBook {
  id: number;
  name: string;
}
interface BookProps {
  book: IBook;
}
// Berjalan sisi client
function BookPage({ book }: BookProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log("ISR");
  return (
    <div>
      <h1>Book Page: {book.name}</h1>
      <p>ID: {book.id}</p>
    </div>
  );
}
// getStaticPaths kan berjalan dari sisi server untuk mencari semua path
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:9000/books?_limit=10");
  const books: IBook[] = await response.json();
  console.log("path");
  const paths = books.map((book) => ({
    params: { bookId: book.id.toString() },
  }));
  return { paths, fallback: true };
};
// getStaticProps kan berjalan dari sisi server
export const getStaticProps: GetStaticProps<BookProps> = async (context) => {
  const { params } = context;
  if (!params?.bookId) {
    return { notFound: true };
  }
  console.log("server");
  const response = await fetch(`http://localhost:9000/books/${params.bookId}`);
  const book: IBook = await response.json();
  if (!book) {
    return { notFound: true };
  }
  return {
    props: {
      book,
    },
    revalidate: 1,
  };
};
export default BookPage;
