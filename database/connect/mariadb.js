const mariadb = require('mysql');

const conn = mariadb.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        // 여기까지 하면 mariadb에 접속을 하게 된다.
        // 이제 방으로 접속을 하자
        database: 'Tennis'
    }
);


module.exports = conn;