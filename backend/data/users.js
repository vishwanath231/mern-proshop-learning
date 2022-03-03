import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123',10),
        isAdmin: true
    },
    {
        name: 'vishwanath',
        email: 'vishwanathvishwabai@gmail.com',
        password: bcrypt.hashSync('123',10),
    },
    {
        name: 'venkat',
        email: 'venkat@gmail.com',
        password: bcrypt.hashSync('123',10),
    }
]

export default users;