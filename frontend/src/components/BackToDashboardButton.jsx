import { useNavigate } from "react-router-dom";

export function BackToDashboardButton() {
    const navigate = useNavigate();
    return <>
        <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center ml-5 w-fit py-2 px-4 text-white bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition duration-200"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back to Dashboard
        </button>
    </>
}