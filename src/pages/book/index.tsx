// Component SSG & ISR
import { GetStaticProps } from "next";
import React from "react";
interface IBooks {
  id: number;
  name: string;
}
interface BooksProps {
  books: IBooks[];
}
// Berjalan sisi client
function Index({ books }: BooksProps) {
  console.log(books);
  return (
    <div>
      <h1>Books Page</h1>
      {books.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
}
// getStaticProps kan berjalan dari sisi server
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:9000/books");
  const books = await response.json();
  console.log(books);
  return {
    props: {
      books,
    },
  };
};
export default Index;
