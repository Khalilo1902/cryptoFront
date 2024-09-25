import { ReactNode } from "react";

interface IMaxWithWrapperProps{
    children:ReactNode;
    className?:string
}
const MaxWithWrapper = ({children,className}:IMaxWithWrapperProps) => {
    return (
        <div className={`mx-auto w-full max-w-screen-3xl px-2.5 md:px-10 lg:px-24 ${className}`}>
            {children}
        </div>
    );
}

export default MaxWithWrapper;