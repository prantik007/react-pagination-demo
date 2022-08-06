import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(todos.length / 10);

  const changePage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const PagesBar = () => {
    const pagesArray = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray.map((pageIndex) => (
      <span
        className={
          pageIndex === currentPage ? "span-page-selected" : "span-page"
        }
        key={pageIndex}
        onClick={() => changePage(pageIndex)}
      >
        {pageIndex}|
      </span>
    ));
  };

  const prevHandler = () => {
    setCurrentPage((curr) => curr - 1);
  };

  const nextHandler = () => {
    setCurrentPage((curr) => curr + 1);
  };

  useEffect(() => {
    async function getTodos() {
      const data = await fetch("https://jsonplaceholder.typicode.com/todos");
      setTodos(await data.json());
    }
    getTodos();
  }, []);

  useEffect(() => {
    const newTodosArray = todos.slice(
      (currentPage - 1) * 10,
      (currentPage - 1) * 10 + 10
    );
    setVisibleTodos(newTodosArray);
  }, [todos, currentPage]);

  return (
    <div className="App">
      <div>
        <button
          disabled={currentPage === 1 ? true : false}
          onClick={prevHandler}
        >
          previous
        </button>
        <PagesBar />
        <button
          disabled={currentPage === numberOfPages ? true : false}
          onClick={nextHandler}
        >
          next
        </button>
      </div>
      <div>
        {visibleTodos.map((todo) => {
          return <p key={todo.id}>{todo.title}</p>;
        })}
      </div>
    </div>
  );
}
