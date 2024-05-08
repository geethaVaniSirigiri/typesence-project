const express = require('express')
const dotenv = require("dotenv")
const typesenseClient = require("./typesense/client");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes */
app.post("/create-schema", async (req, res, next) => {
    try {
        const data = await typesenseClient.collections().create(req.body);
        res.status(200).json({ message: "Schema created", data: data });
    } catch (error) {
        console.log(error, "gfgfgfgf")
        res.status(500).json({ message: error, data: error })
    }
});

app.post("/create", async (req, res, next) => {
    try {
        const data = await typesenseClient
            .collections(req.body.collectionName)
            .documents()
            .import(req.body.document, { action: "emplace" });
        res.status(200).json({ message: "Employee added", data: data });
    } catch (error) {
        res.status(500);
    }
});

app.get("/get-employees", async (req, res, next) => {
    try {
        const data = await typesenseClient
            .collections(req.query.collectionName)
            .documents()
            .search({ q: req.query.q, query_by: req.query.query_by });
        res.status(200).json({ message: "Success", data: data?.hits });
    } catch (error) {
        res.status(500);
    }
});

app.patch("/update-employees", async (req, res, next) => {
    try {
        const data = await typesenseClient
            .collections(req.body.collectionName)
            .documents(req.body.id)
            .update(req.body.document);
        res.status(200).json({ message: "Record updated", data: data });
    } catch (error) {
        res.status(500);
    }
});

app.delete("/delete-employees", async (req, res, next) => {
    try {
        const data = await typesenseClient
            .collections(req.body.collectionName)
            .documents(req.body.id)
            .delete();
        res.status(200).json({ message: "Record deleted", data: data });
    } catch (error) {
        res.status(500);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port-->${process.env.PORT}`);
});

