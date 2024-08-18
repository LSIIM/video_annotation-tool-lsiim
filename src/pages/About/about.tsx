import Header from "@/components/Header"

export default function About(){
    return (
        <div className='flex-col h-screen w-screen'>
            <Header/>
            <div className="flex justify-center mt-10">
                <div className="flex-col">
                    <p className="text-7xl font-bold">About</p>
                    <p className="mx-8">Yet to be developed</p>
                </div>
            </div>
        </div>
    );
}