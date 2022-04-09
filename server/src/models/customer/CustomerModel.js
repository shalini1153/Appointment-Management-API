
import dbConnection from '../../core/DbConnection';
import DataType, { Sequelize } from 'sequelize';

export const Customer = dbConnection.connect().define('customers', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Email is Incorrect!"
            }
        }
    },
    firstName: {
        type: DataType.STRING,
        field: "first_name"
    },
    lastName: {
        type: DataType.STRING,
        field: "last_name"
    },
    password: {
        type: DataType.STRING,
        allowNull: false,
    },
    phone: {
        type: DataType.STRING,
        allowNull: true,
        field: "phone"
    },
    createdAt: {
        type: DataType.DATE,
        field: "created_at",
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
});
