import { DataTypes, Model } from 'sequelize';
import Database from '../config/database';
import { UserInterface, UserCreationInterface } from '../interfaces/models/UserInterface';

const connection = Database.getconnection();


class User extends Model<UserInterface, UserCreationInterface> implements UserInterface {
    public id!: number;
    public userName!: string;
    public email!: string;
    public phoneNumber!: string;
    public password!: string;
    public code!: number;
    public codeExpiredAt!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            field: 'user_name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'phone_number',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        codeExpiredAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            field: 'code_expired_at',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at',
        }
    },
    {
        sequelize: connection,
        tableName: 'users',
    }
);



export default User;
