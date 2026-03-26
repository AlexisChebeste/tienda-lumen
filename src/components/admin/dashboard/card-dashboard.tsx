

interface CardDashboardProps {
    title: string;
    value?: number | string;
    icon?: React.ReactNode;
    resume?: boolean;
    description: string;
    className?: string;
    children?: React.ReactNode;
}

export default function CardDashboard({ title, value, icon, resume = false, description, className, children }: CardDashboardProps) {


    return (
        <div className={`card-container ${className} `}>
            <div className="w-full flex items-center justify-between">
                {resume ? (
                    <>
                        <h2 className="font-semibold text-sm">{title}</h2>
                        {icon && <div className="text-gray-400">{icon}</div>}
                    </>
                ) : (
                    
                    <div className="flex items-center gap-2">
                        {icon}
                        <h2 className="font-semibold text-sm">{title}</h2>
                    </div>
                )}
            </div>
            <div className="flex flex-col">   
                {value &&
                    <p className="text-xl font-bold">{value}</p>

                }
                <p className="text-gray-500 text-xs">{description}</p>
            </div>

            {children}
        </div>
    );
}