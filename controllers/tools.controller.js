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
  try {
    const db = getDb();
    const {id} = req.params;
    if (! ObjectId.isValid(id)) {
      return res.status(400).json({success: false, message: 'Please insert valid id.'});
    }
    else{
      const result = await db.collection("tools").updateOne({ _id: ObjectId(id) },{$set: req.body});
      if(! result.modifiedCount){
        return res.status(400).json({success: false, message: 'Data upto date.'})
      }
      res.status(200).json({ success: true, message: "Successfully updated."});
    }
  } catch (error) {
    next(error)
  }
};

module.exports.deleteTool = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };

  tools = tools.filter(tool => tool.id !== Number(id));
  console.log(tools);

  res.send(tools);
};