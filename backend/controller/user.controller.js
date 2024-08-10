const jwt = require('jsonwebtoken');


const users = [
    { username: 'admin', password: '1234', role: 'admin' },
    { username: 'user', password: 123, role: 'regular' },
];

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (password != user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username, role: user.role }, '%$#@!', { expiresIn: '1h' });

    res.status(200).send(data={token});
};
