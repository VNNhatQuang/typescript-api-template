import { Optional } from "sequelize";


// User Attributes
interface UserInterface {
    id?: number;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    code?: number;
    codeExpiredAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// Create interface for attributes maybe undefined when create new
interface UserCreationInterface extends Optional<UserInterface, 'id' | 'code' | 'codeExpiredAt' | 'createdAt' | 'updatedAt'> { }



export { UserInterface, UserCreationInterface }