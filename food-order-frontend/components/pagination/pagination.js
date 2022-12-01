import Item from "./item";

export default function Pagination({ PageNumbers, currentPage, setCurrentPage, url }) {
  let pagination = Array.from(Array(PageNumbers).keys());
  console.log('page numbers::',PageNumbers)
  console.log('///////////////////////////')
  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="bg-white inline-flex -space-x-px">
        <Item
          page={"preview"}
          url={`${url}${currentPage - 1}`}
          setPage={() => {
            setCurrentPage((current) => current - 1);
          }}
          currentPage={currentPage}
        ></Item>
        {pagination.map((number) => (
          <Item
            url={`${url}${number + 1}`}
            setPage={() => {
              setCurrentPage(number + 1);
            }}
            page={number + 1}
            currentPage={currentPage}
            key={number}
          ></Item>
        ))}
        <Item
          page={"next"}
          url={`${url}${currentPage + 1}`}
          setPage={() => {
            setCurrentPage((current) => current + 1);
          }}
          currentPage={currentPage}
          lastPage={PageNumbers}
        ></Item>
      </ul>
    </nav>
  );
}
