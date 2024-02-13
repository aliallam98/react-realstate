/* eslint-disable @typescript-eslint/no-explicit-any */

interface IProps {
  page: string | number;
  totalPages: string | number;
  setFilteringData: any;
  filteringData: any;
}

const Pagination = ({
  page,
  totalPages,
  setFilteringData,
  filteringData,
}: IProps) => {
  const onClickHandler = (value: string) => {
    const pageValue = value === "prev" ? Number(page) - 1 : Number(page) + 1;
    setFilteringData({ ...filteringData, page: pageValue.toString() });
  };

  console.log(page);
  console.log(totalPages);

  return (
    <div className="flex justify-center items-center gap-x-10 mt-10">
      <button
        onClick={() => onClickHandler("prev")}
        disabled={Number(page) <= 1}
      >
        Prev
      </button>
      <p>
        {page} OF {totalPages}
      </p>
      <button
        onClick={() => onClickHandler("next")}
        disabled={Number(page) >= Number(totalPages)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
