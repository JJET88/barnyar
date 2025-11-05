import { mysqlPool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {id} = await params;
    const promisePool = mysqlPool.promise();
    const [rows,fields] = await promisePool.query(
            `SELECT * FROM attractions WHERE id = ?;`,
            [id]
    );
    if (rows.length==0){
        return NextResponse.json(
            {message: `Attraction with id ${id} not found.`},
            {status: 404}
        );
    }
  
    return NextResponse.json(rows[0]);
}