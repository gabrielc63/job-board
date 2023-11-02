import asyncHandler from "express-async-handler";

const getContractHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contract = await Contract.findOne({
    where: { id: id, ContractorId: req.profile.id },
  });
  if (!contract) return res.status(404).end();

  res.json(contract);
});

const getAllContractsHandler = asyncHandler(async (req, res) => {
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ContractorId: req.profile.id }, { ClientId: req.profile.id }],
    },
  });
  res.json({ contracts });
});

export { getAllContractsHandler, getContractHandler };
