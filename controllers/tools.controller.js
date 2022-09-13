const { ObjectId } = require("mongodb");
const { getDb } = require("../utility/dbConnect");


module.exports.getAllTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { limit, page } = req.query;
    const tools = await db
      .collection("tools")
      .find({})
      // .project({ _id: 0 })
      .skip(Number(page) * limit)
      .limit(+limit)
      .toArray();
    const result = tools.slice(0, limit);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error)
  }
};

module.exports.saveATool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection('tools').insertOne(tool);
    res.status(200).json({ success: true, insertedId: result.insertedId })
  } catch (error) {
    next(error);
  }
};

module.exports.getToolDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const {id} = req.params;
    const result = await db.collection("tools").findOne({ _id: ObjectId(id) });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTool = async (req, res, next) => {
  // try {
  //   const db = getDb();
  //   const objId = {_id: ObjectId(req.params)};
  //   const newData = req.body;
  // } catch (error) {
  //   next(error)
  // }
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