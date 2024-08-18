import { Optional } from "sequelize";


// User Attributes
interface UserInterface {
    id?: number;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Create interface for attributes maybe undefined when create new
interface UserCreationInterface extends Optional<UserInterface, 'id' | 'createdAt' | 'updatedAt'> { }



export { UserInterface, UserCreationInterface }