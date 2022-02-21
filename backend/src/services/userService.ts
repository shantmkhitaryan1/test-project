import User from '../db/models/user'
import { UserData } from '../models/userModel';

export default class UserService {
    public async getUserById(id: string) {
        try {
            const user = await User.findById(id)
            return new UserData(
                user._id,
                user.name,
                user.surname,
                user.username,
            );
        } catch(e) {
            return null;
        }
    }

    public async getUserByEmail(username: string) {
        try {
            const user = await User.findOne({ username })
            return user;
        } catch(e) {
            return null;
        }
    }

    public async addNewUser(body: {
        name: string;
        surname: string;
        username: string;
        password: string;
    }) {
        const user = new User({
            name: body.name,
            surname: body.surname,
            username: body.username,
        })
        user.setPassword(body.password);
        await user.save();
        return new UserData(
            user._id,
            user.name,
            user.surname,
            user.username,
        );
    }
}