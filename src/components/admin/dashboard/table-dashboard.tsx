export default function TableDashboard({
  columns,
  data,
  renderMobile,
  dataFormatters
}: {
  columns: { key: string, label: string }[],
  data: any[],
  renderMobile?: (row: any) => React.ReactNode
  dataFormatters: any[]
}) {


  return (
    <div className="w-full overflow-x-auto">

      {/* DESKTOP */}
      <table className="hidden md:table w-full border-none h-full"> 
        <thead > 
          <tr > 
            {columns.map((column, index) => ( 
              <th key={index} className="p-2 first:text-left text-center text-sm font-medium text-gray-700 uppercase tracking-wider"> 
              {column.label} 
              </th> 
            ))} 
          </tr> 
        </thead>
        <tbody> 
          {dataFormatters.map((row, rowIndex) => ( 
            <tr key={rowIndex} > 
              {columns.map((column, cellIndex) => ( 
                <td key={cellIndex} className="p-2 py-4 text-center text-sm text-gray-600 first:text-left last:font-semibold"> 
                  {row[column.key] !== undefined ? column.key === "número de pedido" ? `#${row[column.key].toString().padStart(6, '0')}` : row[column.key] : "-"}
                </td> 
              ))} 
            </tr> 
          ))} 
        </tbody> 
      
      </table>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col gap-3">
        {data.map((row, index) => (
          <div key={index}>
            {renderMobile ? renderMobile(row) : (
              <pre>{JSON.stringify(row)}</pre>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}