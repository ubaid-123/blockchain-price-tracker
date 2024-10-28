const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Alert",
  tableName: "alerts",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    chain: {
      type: "varchar",
    },
    dollar: {
      type: "float",
    },
    email: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
    },
  },
});
