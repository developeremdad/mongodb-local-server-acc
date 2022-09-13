const { ObjectId } = require("mongodb");
const { getDb } = require("../utility/dbConnect");

let tools = [
    { id: 1, name: "Hammer" },
    { id: 2, name: "Hammer2" },
    { id: 3, name: "Hammer3" },
  ];
  
  module.exports.getAllTools = (req, res, next) => {
    const { limit, page } = req.query;
    console.log("Limit:",limit, "Page:", page);
    res.json(tools.slice(0, limit));
  };
  
  module.exports.saveATool = async (req, res, next) => {
    try {
      const db = getDb();
      const tool = req.body;
      const result = await db.collection('tools').insertOne(tool);
      res.send(`Insert successfully with id ${result.insertedId}`)
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.getToolDetail =  async (req, res, next) => {
    try {
      const db = getDb();
      const objId = {_id: ObjectId(req.params)};
      console.log(objId);
      const result = await db.collection("tools").findOne(objId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.updateTool = (req, res) => {
    // const newData = req.body;
    const { id } = req.params;
    const filter = { _id: id };
  
    const newData = tools.find(tool => tool.id === Number(id));
    console.log(newData);
  
    newData.id = id;
    newData.name = req.body.name;
  
    res.send(newData);
  
  };
  
  module.exports.deleteTool = (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
  
    tools = tools.filter(tool => tool.id !== Number(id));
    console.log(tools);
  
    res.send(tools);
  };