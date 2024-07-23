let http = require('http');  // node에서 제공하는 http 관련 내용을 받아온다
let url = require('url');
//const {URL} = require('url');

// start 안에 넣어준다. start를 사용하고 싶으면 export 하자 
function start(route, handle) {
    // 요청과 응답을 받는다. 자동으로 node에서 각각 넣어주고 만들어준다.
    function onRequest(request, response){
        // parse는 문자열을 잡는다. 
        // console.log로 터미널에 경로를 찍어낸다.
        // 웹 서버가 request를 받기 때문에 pathname은 무조건 받게 된다. 
        // request한 url을 받아서 경로를 확인해 pathname에 저장한다.
        // 이 결로를 start할 때 받은 route 함수 안에 넣는다.
        let pathname = url.parse(request.url).pathname;
        //let parsedUrl = new URL(request.url, `http://${request.headers.host}`);
        //let pathname = parsedUrl.pathname;
        // 서버가 pahtname을 캐치해서 route함수 안에 넣어준다.

        let queryData = url.parse(request.url, true).query;
        console.log('Received request for ' + pathname + ' with productId ' + queryData.productId);

        route(pathname, handle, response, queryData.productId);
        //console.log('pathname : ' + pathname);

        
        // http는 head와 body로 이루어진다.
        // 이떄 body에는 내용이 들어가고, head에는 통신 상태가 들어간다.(200, 204, 500 등), 또 응답의 형태를 적어준다. (html인지 뭔지 등)
        // 이게 head
        //response.writeHead(200, {'Content-Type' : 'text/html'});
        // 이게 body다 
        //response.write('Hello Node.js');
        // 전송이 날아간다. 
        //response.end();
    }

    // onRequest 함수로 통신하고 이떄 주파수는 8888로 맞출것이다. 다른말로 포트 번호다. 
    http.createServer(onRequest).listen(8888);
    // localhost:8888
}

// 외부에서 start 함수를 사용이 가능하게 한다.
exports.start = start;

// 이 파일을 실행할 떄는 node server.js를 터미널에 입력한다. 파일명은 그떄마다 다르게 하자
// 서버를 종료할 때는 터미널에서 ctrl + c를 하자
