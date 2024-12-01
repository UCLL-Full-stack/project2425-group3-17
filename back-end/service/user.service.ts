import bcrypt from 'bcrypt';
import userDB from '../repository/User.db';
import { User } from '../model/User';
import { AuthenticationResponse, UserInput } from '../types';

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`No user with username: ${username} does not exist`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password');
    }
    return {
        token: '',
        username: username,
    };
};

const createUser = async (userInput: UserInput): Promise<User> => {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const newUser = new User({
        username: userInput.username,
        password: hashedPassword,
        name: userInput.name,
        surname: userInput.surname,
        email: userInput.email,
        permission: userInput.permission,
        createdAt: new Date(),
    });
    return userDB.createUser({ user: newUser });
};

export default { getUserByUsername, authenticate, createUser };