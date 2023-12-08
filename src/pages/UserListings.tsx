import { Link, Navigate,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/Button"
import InputWithLabel from "../components/InputWithLabel"
import { useMemo,} from "react"
import { useTable,useSortBy, Column, usePagination,useGlobalFilter } from "react-table"
import  allData from '../../public/jobs.json'
import { MdKeyboardArrowUp,MdKeyboardArrowDown  , MdKeyboardDoubleArrowRight ,MdKeyboardDoubleArrowLeft  } from "react-icons/md";
import { GrFormNextLink,GrFormPreviousLink } from "react-icons/gr";
import {ColumnFilter} from "../components/ColumnFilter"


interface IData {
    id: number
    companyName: string
    jobTitle: string
    companyLogo:string
    minPrice: string
    maxPrice: string
    salaryType: string
    jobLocation: string
    postingDate: string
    experienceLevel:string
    employmentType: string
    description: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEdit =(row :any)=>{
    console.log("Edit button clicked for row ID:", row.original.id);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDelete =(row :any)=>{
    console.log("Edit button clicked for row ID:", row.original.id);
    
}

const  columns: Column<IData>[]= [ 
  {
    Header : 'Company Name',
    accessor:"companyName",
    Filter:ColumnFilter
  },
  {
    Header : 'Job Title',
    accessor:"jobTitle",
    Filter:ColumnFilter
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      // Render edit and delete buttons
      return (
        <div className="space-x-3">
          <Button className="" onClick={() => handleEdit(row)}><Link to={`/edit-listing/${row.original.id}`}>Edit</Link></Button>
          <Button className="" onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      );
    },
  },
  ]



const UserListings = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const data : IData[]= useMemo(()=> allData , [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter
  } = useTable({ columns, data },useGlobalFilter,useSortBy,usePagination);  

const {pageIndex,pageSize,globalFilter} = state

  return currentUser ? (
    <section className="p-10 text-center">
      <div className="container h-full p-5 shadow-md border border-neutral-200">
        <h3 className="text-center text-lg font-semibold">My Listings</h3>
        <div className="flex flex-row flex-wrap justify-center gap-5 mt-4">
          <InputWithLabel
          label="SEARCH"
          name="searchKey"
          type="text"
          onChange ={(e)=> setGlobalFilter(e.target.value)}
          value={globalFilter}
          />
          <Button

          title="Search"
          className="px-4 py-2 border max-lg:mb-8 border-neutral-200 h-fit"
          />
        </div>

        <button className="block mx-auto border border-neutral-200 py-2 px-4"><Link to={'/create-list'}>Add New List</Link></button>

        <div className="relative p-5">
          <div className="w-fit absolute right-10 -top-8 border border-neutral-200 p-2">
            {/* Select numbers of Records */}
            <select value={pageSize} className="outline-none"
            onChange={(e)=> setPageSize(Number(e.target.value))}>
              {[10,25,50].map((ele,i)=> (<option value={ele} key={i+1}>Show {ele}</option>))}
            </select>
          </div>
          <table
        {...getTableProps} className="table table-striped table-sm border border-neutral-200 table-fixed w-full ">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
          {...headerGroup.getHeaderGroupProps()}>
                
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())} scope="col" className="relative ">
                {column.render("Header")}
                <span className="absolute top-1/2 -translate-y-1/2 left-1/4">{column.isSorted? (column.isSortedDesc ? <MdKeyboardArrowDown/>   : <MdKeyboardArrowUp/>) : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
          </table>
        </div>
        
        <div className="w-fit mx-auto mt-4  flex items-center gap-2">
          <Button className="p-2" onClick={()=>gotoPage(0)} disabled = {!canPreviousPage}> <MdKeyboardDoubleArrowLeft  size={25}/></Button>
          <Button className="p-2 mr-2" onClick={()=>previousPage()} disabled = {!canPreviousPage}> <GrFormPreviousLink size={25}/></Button>
          <span className="block w-fit font-medium ">{`${pageIndex + 1 } OF ${pageOptions.length}`}</span>
          <Button className="p-2 ml-2" onClick={()=>nextPage()} disabled = {!canNextPage}> <GrFormNextLink size={25}/></Button>
          <Button className="p-2" onClick={()=>gotoPage(pageCount - 1)} disabled = {!canNextPage}> <MdKeyboardDoubleArrowRight  size={25}/></Button>
        </div>
      </div>
    </section>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default UserListings;
