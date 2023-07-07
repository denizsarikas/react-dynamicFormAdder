

export default function Test() {
    return (
        <div className="flex flex-col w-5/6 mx-auto">
            <h1 className="text-3xl not-italic font-black">Users</h1>
            <div className="flex justify-between">
                <label className="flex rounded border-2 border-[#BFC8E5] p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users"
                    />
                </label>
                <div className="flex items-center gap-7">
                    <p>Reputation</p>
                    <p>New Users</p>
                    <p>Voters</p>
                    <p>Editors</p>
                    <p>Moderators</p>
                </div>
            </div>
        </div>
    )
}
