const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('Linkstarter_WireGuard_3108', 26);
console.log(hash);
