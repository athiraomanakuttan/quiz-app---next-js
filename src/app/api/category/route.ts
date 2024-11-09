import { NextRequest, NextResponse } from "next/server";
import  {connect} from '../../../utils/dbConfig'
import  {categoryModel}  from '../../../models/categoryModel';


export const GET = async () => {
    try {
        const categories = await categoryModel.find({ status: 1 });
        return NextResponse.json({ status: 200, message: "Data fetched successfully", categories });
    } catch (error) {
        console.error("Failed to get category data:", error);
        return NextResponse.json({ status: 400, message: "Failed to get the category data" });
    }
};

// export const POST = async (req:NextRequest)=>{
//     const { categoryName } =  await req.json();
//     try {
//         if(!categoryModel)
//             console.log("connection failed")
//         else
//             console.log("connection sucess")
//         const checkData =  await categoryModel.find({category:categoryName})
//         console.log(checkData)
//         return NextResponse.json({status:200, message:"added category successfully"})
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({status : 400 , error})
//     }
// }

export const POST = async (req: NextRequest) => {
    await connect(); // Ensure connection before proceeding

    const { categoryName } = await req.json();
    try {
        const checkData = await categoryModel.find({ category: categoryName });
        if(!checkData.length)
        {
            const addCategory = await categoryModel.create({ category: categoryName });
            return NextResponse.json({ status: 200, message: "Category added successfully", data: addCategory });
        }
        else
        return NextResponse.json({ status: 400, message: "category already exist" });
    } catch (error) {
        return NextResponse.json({ status: 400, error });
    }
};