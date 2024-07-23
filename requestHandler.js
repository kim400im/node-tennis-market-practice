// 화면을 바꾸는 모듈 불러오기
const fs = require('fs');
const mani_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');


const mariadb = require('./database/connect/mariadb');

// 여기서 요청을 처리한다.
function main(response) {
    console.log('main');

    mariadb.query("select * from product", function(err, rows){
        console.log(rows);
    })

    // 이게 head
    response.writeHead(200, {'Content-Type' : 'text/html'});
    // 이게 body다 
    response.write(mani_view);
    // 전송이 날아간다. 
    response.end();
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        // 이게 head
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // 이게 body다 
        response.write(data);
        // 전송이 날아간다. 
        response.end();
    })
}
function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        // 이게 head
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // 이게 body다 
        response.write(data);
        // 전송이 날아간다. 
        response.end();
    })
}
function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        // 이게 head
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // 이게 body다 
        response.write(data);
        // 전송이 날아간다. 
        response.end();
    })
}

function order(response, productId){
    response.writeHead(200, {'Content-Type' : 'text/html'});

    const currentDate = new Date().toLocaleDateString(); // 현재 날짜를 문자열로 변환

    mariadb.query("INSERT INTO orderlist VALUES(?, ?);", [productId, currentDate], function(err, rows){
        console.log(rows);
    });

    // "INSERT INTO orderlist VALUES(" + productId + ", '" + new Date().toLocaleDateString + "');"
    response.write('order page');
    response.end();
}

function orderlist(response){
    console.log('orderlist');

    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows){

        // if (err) {
        //     console.error('Error querying database:', err);
        //     response.writeHead(500, {'Content-Type': 'text/html'});
        //     response.write('Database error');
        //     response.end();
        //     return;
        // }

        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                + "<td>"+element.product_id+"</td>"
                + "<td>"+element.order_date+"</td>"
                +"</tr>");
        });

        response.write("</table>");
        response.end();
        // console.log(rows); // 디버그용 로그
        // let html = orderlist_view;  // 기본 템플릿 로드

        // rows.forEach(element => {
        //     html += "<tr>"
        //         + "<td>" + element.productId + "</td>"
        //         + "<td>" + element.orderDate + "</td>"
        //         + "</tr>";
        // });

        // html += "</table></body></html>";  // HTML 마감

        // response.writeHead(200, {'Content-Type': 'text/html'});
        // response.write(html);  // 최종 HTML 응답
        // response.end();
    })
}


let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle['/orderlist.html'] = orderlist;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;


exports.handle = handle;