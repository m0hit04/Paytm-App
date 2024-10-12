import {useNavigate} from "react-router-dom"
export const Appbar = () => {
    const navigate = useNavigate();
    return <>
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        U
                    </div>
                </div>
                <div className="flex justify-center pt-2 h-25 w-28">
                    <button type="button" className=" flex justify-center text-gray-900 border hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/")
                    }}>Sign Out</button>
                </div>
            </div>
        </div>
    </>
}