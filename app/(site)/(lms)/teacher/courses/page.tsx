
import { columns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";



const CoursesPage = async() => {

    const {userId } = await auth();
    if(!userId){
        return redirect("/")
    }

    const courses = await db.course.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return ( 
    <div className="p-6">
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={courses} />
        </div>

    </div> );
}
 
export default CoursesPage;