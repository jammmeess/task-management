import  Link  from "next/link";


export default function Navbar () {
    return <nav className="flex items-center justify-between fixed left-0 right-0 px-8 h-14">
        <Link href={"/"}><h1 className="text text-md font-bold  w-full flex">Task Management App</h1></Link>
    </nav>
    
}