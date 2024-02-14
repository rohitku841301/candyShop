const Candy = require("../models/candy");

exports.postCandy = async (req, res, next) => {
  try {
    console.log(req.body);
    const candyData = await Candy.create(req.body);
    if (candyData) {
      const responseData = {
        candyId: candyData.dataValues.candyId,
        candyName: candyData.dataValues.candyName,
        description: candyData.dataValues.description,
        price: candyData.dataValues.price,
        quantity: candyData.dataValues.quantity,
      };
      res.status(201).json({
        message: "Candy Added Sucessfull",
        responseData: responseData,
      });
    } else {
      res.status(401).json({
        message: "Candy Added unsucessfull",
      });
    }
  } catch (error) {
    // console.log("dnn");
    console.log(error);
  }
};

exports.getCandy = async (req, res, next) => {
  try {
    const allCandyData = await Candy.findAll();
    const responseData = allCandyData.map((candyData) => ({
      candyId: candyData.dataValues.candyId,
      candyName: candyData.dataValues.candyName,
      description: candyData.dataValues.description,
      price: candyData.dataValues.price,
      quantity: candyData.dataValues.quantity,
    }));
    res.status(201).json({
      message: "successful fetching of candy data",
      responseData: responseData,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCandy = async (req, res, next) => {
  console.log(req.body);
  const userId = req.params.userId;
    const edit = await Candy.update(req.body,{where:{candyId:userId}})
};
