const { EntitySchema } = require("typeorm");
module.exports = new EntitySchema({
  name: "Price",
  tableName: "prices",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    ethereum: {
      type: "float",
    },
    polygon: {
      type: "float",
    },
    timestamp: {
      type: "timestamp",
    },
  },
});
