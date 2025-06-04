// imports
import http from "k6/http"
import { check, sleep, group } from "k6" 


//options incl threasholds
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        "http_req_duration{group:::Main Page}": ['p(95)<800'],


    }
}



//custome metrics


//requests and logic... and checks
export default function () {
    group('Main Page', function () {
        //PAGE1 - MAIN
        let res = http.get("https://quickpizza.grafana.com/test.k6.io/");
        check(res, {"status is 200": (r) => r.status === 200});
        group("Main Page Assets", function () {
            http.get("https://quickpizza.grafana.com/test.k6.io/static/css/site.css");
        });
    });



    group('News Page', function () {
        //PAGE2 - NEWS
        let res = http.get("https://quickpizza.grafana.com/news.php");
        check(res, {"status is 200": (r) => r.status === 200});
    });



    sleep(1);
}

