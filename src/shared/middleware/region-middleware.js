const regionmiddleware = async (req, res, next) => {
  const regionsent = req.query.region 

   if (regionsent === "north" ||regionsent === "south" ||regionsent === "east" ||regionsent === "west") {

    next()

   }else {

      res.status(400);
      res.send(`Error: Not a region`);
      return;
      }
      
      
      


   

};

module.exports = { regionmiddleware };