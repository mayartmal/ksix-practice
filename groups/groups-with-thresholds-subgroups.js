// imports
import http from "k6/http"
import { check, sleep, group } from "k6" 


//options incl threasholds
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        "http_req_duration{expected_response:true}": ['p(95)<1000'],
        "http_req_duration{group:::Main Page}": ['p(95)<8000'],
        "http_req_duration{group:::News Page}": ['p(95)<6000'],
        "http_req_duration{group:::Main Page::Assets}": ['p(95)<3000']

    }
}



//custome metrics


//requests and logic... and checks
export default function () {
    group('Main Page', function () {
        //PAGE1 - MAIN
        let res = http.get("https://run.mocky.io/v3/be967d40-29bd-4e6f-a146-780c2bfd610e?mocky-delay=5000ms");
        check(res, {"status is 200": (r) => r.status === 201});
        group("Assets", function () {
            http.get("https://run.mocky.io/v3/be967d40-29bd-4e6f-a146-780c2bfd610e?mocky-delay=1000ms");
            http.get("https://run.mocky.io/v3/be967d40-29bd-4e6f-a146-780c2bfd610e?mocky-delay=1000ms");
        });
    });



    group('News Page', function () {
        //PAGE2 - NEWS
        let res = http.get("https://run.mocky.io/v3/68aecc73-e591-46ac-9ac9-0b6a78dac668");
        check(res, {"status is 200": (r) => r.status === 201});
    });



    sleep(1);
}

