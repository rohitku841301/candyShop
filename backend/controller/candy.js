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
  let updateQuantity = null;
  const candyId = req.params.candyId;
  const candyData = await Candy.findByPk(candyId);
  if(candyData){
    updateQuantity = candyData.quantity - req.body.btnNumber;
  }else{
    res.status(402).json({
      responseMessage: "candyData is not found"
    })
  }
  const updateCandy = await Candy.update({quantity:updateQuantity},{where:{candyId:candyId}});
  if(updateCandy[0]>0){
    res.status(201).json({
      responseMessage: "update successful",
      updateQuantity:updateQuantity
    })
  }else{
    res.status(401).json({
      responseMessage:"update unsuccessful"
    })
  }
};
