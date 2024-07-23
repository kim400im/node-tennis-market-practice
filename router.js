const fs = require('fs');
const path = require('path');

function route(pathname, handle, response, productId){
    console.log('pathname : ' + pathname);
    // pathname은 서버가 준다.
    // 이걸 다른 파일에서도 사용하도록 export 하자

    if (typeof handle[pathname] == 'function') {
        handle[pathname](response, productId);
    } else {
        const filePath = path.join(__dirname, pathname);
        //console.log('No request handler found for ' + pathname);

        fs.readFile(filePath, function(err, data){
            if (err) {
                console.log('No request handler found for ' + pathname);

                response.writeHead(404, {'Content-Type' : 'text/html'});
                response.write('Not Found');
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(data);
            response.end();
        });
    }
}


exports.route = route;