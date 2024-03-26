const Data = require("../../shared/resources/data");

//I changed below
const ContactModel = require("../../shared/db/mongodb/schemas/public.Schema"); // Assuming you have a Mongoose model defined

const contactUs = async (req, res) => {
  const {
    fullname,
    email,
    phone,
    company_name,
    project_name,
    project_desc,
    department,
    message,
  } = req.body;

  // Basic validation
  if (!fullname || !email || !message) {
    return res.status(400).send("Fullname, email, and message are required.");
  }

  // Additional validation if necessary (e.g., email format)

  try {
    // Create a new contact document
    const newContact = new ContactModel({
      fullname,
      email,
      phone,
      company_name,
      project_name,
      project_desc,
      department,
      message,
    });

    // Save the document to the database
    await newContact.save();

    const responseMessage = `Message received from ${fullname}`;
    console.log(responseMessage);
    res.send(responseMessage);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).send("Error saving contact.");
  }
};

//I NEED TO READ IN A BUILDING TYPE VIA REQ.PARAMS.BUILDINGTYPE
//THEN USE A SWITCH OR IF STATEMENT TO CALCULATE TOTAL COST DEPENDING ON BUILDING TYPE
//FIRST CALC ELEVATORS THEN CAL TOTAL
const calculateQuote = (req, res) => {
  // define constants
  const buildingType = req.params.buildingType;

  if (buildingType === "residential") {
    const apts = +req.query.apts;
    const floors = +req.query.floors;
    const tier = req.query.tier.toLowerCase();

    // validate request object
    if (!Object.keys(Data.unitPrices).includes(tier)) {
      res.status(400);
      res.send(`Error: invalid tier`);
      return;
    }

    if (isNaN(floors) || isNaN(apts)) {
      res.status(400);
      res.send(`Error: apts and floors must be specified as numbers`);
      return;
    }

    if (!Number.isInteger(floors) || !Number.isInteger(apts)) {
      res.status(400);
      res.send(`Error: apts and floors must be integers`);
      return;
    }

    if (floors < 1 || apts < 1) {
      res.status(400);
      res.send(`apts and floors must be greater than zero`);
      return;
    }

    // business logic
    const numElevators = calcResidentialElev(floors, apts);
    const totalCost = calcInstallFee(numElevators, tier);

    // format response
    res.send({
      elevators_required: numElevators,
      cost: totalCost,
    });
  } else if (buildingType === "commercial") {
    const maxOccupancy = +req.query.maxOccupancy;
    const floors = +req.query.floors;
    const tier = req.query.tier.toLowerCase();

    // validate request object
    if (!Object.keys(Data.unitPrices).includes(tier)) {
      res.status(400);
      res.send(`Error: invalid tier`);
      return;
    }

    if (isNaN(floors) || isNaN(maxOccupancy)) {
      res.status(400);
      res.send(`Error: maxOccupancy and floors must be specified as numbers`);
      return;
    }

    if (!Number.isInteger(floors) || !Number.isInteger(maxOccupancy)) {
      res.status(400);
      res.send(`Error: maxOccupancy and floors must be integers`);
      return;
    }

    if (floors < 1 || maxOccupancy < 1) {
      res.status(400);
      res.send(`maxOccupancy and floors must be greater than zero`);
      return;
    }

    // business logic
    const numElevators = calcCommercialElev(floors, maxOccupancy);
    const totalCost = calcInstallFee(numElevators, tier);

    // format response
    res.send({
      elevators_required: numElevators,
      cost: totalCost,
    });
  } else if (buildingType === "industrial") {
    const elevator = +req.query.elevator;
    const tier = req.query.tier.toLowerCase();
    {
      //business logic
      const numElevators = elevator;
      const totalCost = calcInstallFee(elevator, tier);
      res.send({
        elevators_required: numElevators,
        cost: totalCost,
      });
    }
  }
};

const calcResidentialElev = (numFloors, numApts) => {
  const elevatorsRequired =
    Math.ceil(numApts / numFloors / 6) * Math.ceil(numFloors / 20);
  return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
  const elevatorsRequired =
    Math.ceil((maxOccupancy * numFloors) / 200) * Math.ceil(numFloors / 10);
  const freightElevatorsRequired = Math.ceil(numFloors / 10);
  return freightElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (numElvs, tier) => {
  const unitPrice = Data.unitPrices[tier];
  const installPercentFees = Data.installPercentFees[tier];
  const total = numElvs * unitPrice * installPercentFees;
  return total;
};

module.exports = { contactUs, calculateQuote };
