let server = require('./server');
// node에서 만든 모듈만 사용하는게 아니라 내가 만든 서버도 모듈처럼 사용이 가능하다.
let router = require('./router')
let requestHandler = require('./requestHandler'); 
// 모듈을 index에서 소환한다. 

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

server.start(router.route, requestHandler.handle);
// start를 할 때만 서버가 실행된다.