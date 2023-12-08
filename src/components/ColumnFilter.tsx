

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ColumnFilter = ({filterValue,setFilter}:any) => {
  return (
    <input type="text" value={filterValue || ""} onChange={setFilter} className="block w-full" />
    
  )
}

export default ColumnFilter