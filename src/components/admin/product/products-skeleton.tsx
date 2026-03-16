

export default function ProductsSkeleton() {
    return (
        <div className=" space-y-4 animate-pulse">

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {[...Array(8)].map((_, i) => (
                <div key={i} className="h-60 bg-gray-200 rounded" />
                ))}
            </div>

            <div className="hidden lg:grid grid-cols-12 gap-4">
                <div className="col-span-12 h-96 bg-gray-200 rounded" />

            </div>

            

            <div className="h-10 w-full bg-gray-200 rounded" />

        </div>
    );
}