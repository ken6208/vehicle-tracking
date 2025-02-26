import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Trip extends Model {
  public id!: number;
  public startDateTime!: Date;
  public endDateTime!: Date;
  public price!: number;
  public vehicleId!: string;
  public startLocation!: string;
  public endLocation!: string;
}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vehicleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "trips",
    sequelize,
  }
);

export default Trip;
