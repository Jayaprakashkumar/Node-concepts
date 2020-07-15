const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOperation = require('./operation');

const url = "mongodb://localhost:27017/";
const dname = "conFusion";

MongoClient.connect(url).then((client) => {
    // assert.equal(err, null);
    console.log("db connected");

    const db = client.db(dname);
    // const collection = db.collection("dishes");

    dbOperation.insertDocument(db, { name: "Jayaprakash", description: "Lucky to taste food like this" }, "dishes")
        .then((result) => {
            console.log("Insert documents \n", result.ops)
            return dbOperation.findDocument(db, "dishes")
        }).then((docs) => {
            console.log("Found documents \n", docs);
            return dbOperation.updateDocument(db, { name: "Jayaprakash" }, { description: "bad luck my intusion is wrong" }, "dishes");
        }).then((res) => {
            console.log("updated document \n", res.result);
            return dbOperation.findDocument(db, "dishes");
        }).then((docs) => {
            console.log("Found documents \n", docs);
            return db.dropCollection("dishes");
        }).then((result) => {
            console.log("Collection dropped \n", result);
        }).catch((err) => {
            console.log(err)
        })
}).catch((err) => {
    console.log(err);




    // insert the data into the collections;
    // collection.insertOne({ name: "Manoj", description: "Bad taste" },
    //     (err, data) => {
    //         assert.equal(err, null);
    //         console.log("Data is inserted");
    //         console.log(data.ops); // find the operation done

    //         collection.find({}).toArray((err, result) => {
    //             // get all the documents from the collections.

    //             assert.equal(err, null);
    //             console.log("Found a element ");
    //             console.log(result);

    //             // db.dropCollection("dishes", (err, res) => {
    //             //     assert.equal(err, null);
    //             //     client.close();
    //             // });
    //         });
    // }
    // );
});