import express, { NextFunction, Request, Response } from 'express'
import config from './config'
import initDB, { pool } from './config/db'
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';


const app = express()
const port = config.port;
//parser
app.use(express.json())
//initialize database
initDB()





app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello World! hello')
})


//post users data into DB
app.use('/users',userRoutes )


/*------------------TODO TABLE CRUD----------------*/

//post todo
app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title, description } = req.body;
    try {
        const result = await pool.query(`INSERT INTO todos(user_id, title, description) VALUES($1,$2,$3) RETURNING *`, [user_id, title, description])
        res.status(201).json({
            success: true,
            message: "Todo Inserted Successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }

})


// GET ALL TODOS
app.get("/todos", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos`)
        res.status(200).json({
            success: true,
            message: "Todo Retrived Successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
})

//DELETE SINGLE TODO
app.delete("/todos/:id", async (req: Request, res: Response) => {
    // console.log(req.params.id)
    try {
        const result = await pool.query(`
            DELETE FROM todos WHERE id=$1 RETURNING *
            `, [req.params.id])

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "ToDo Deleted Successfully",
                data: result.rows[0]
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Todo not found",
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Could Not find Data",
            details: error
        })
    }
})



//find todos by id
app.get("/todos/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT * FROM todos WHERE id=$1`, [req.params.id]
        )
        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: `${req.params.id} no todo got from db`,
                data: result.rows[0]
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: error.message,
            details: error
        })
    }
})

//update todo by id
app.patch("/todos/:id", async (req: Request, res: Response) => {
    const { title, description } = req.body
    try {
        const result = await pool.query(
            `UPDATE todos SET title = COALESCE($1,title), description=COALESCE ($2,description ) WHERE id=$3 RETURNING *`, [title, description, req.params.id]
        )

        if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Todo Updated Successfully",
                data: result.rows[0]
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
})

//not found route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.path
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})