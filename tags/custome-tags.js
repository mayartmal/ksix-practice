//imports
import http from 'k6/http'
import { Counter } from "k6/metrics"
import { check, sleep } from 'k6';



//options incl. thtesholds
export const options = {
    thresholds: {
        "http_req_duration{page:init}": ['p(95)<500'],
        "http_req_duration{page:order}": ['p(95)<3000'],
        // 'http_req_duration{status:200}': ['p(95)<100'],
        // 'http_req_duration{status:201}': ['p(95)<2000'],
        "http_errors{page:init}": ['count==0'],
        "http_errors{page:order}": ['count==0'],

        "checks{page:init}":['rate>=0.99'],
        "checks{page:order}":['rate>=0.99']
    }
}


//custome metrics
let httpErrors = new Counter('http_errors');




//requests incl. checks
export default function () {
    // response 200 - init
    let res = http.get(
        "https://run.mocky.io/v3/ad4793b2-6389-43ba-863d-65249b6a7dcc",
        {
            tags: {
                page: "init"
            }
        }
    );

    if (!res.error) {
        httpErrors.add(1, {page: "init"});
    }
    
    check(res, {
        'status is 200': (r) => r.status === 200
    }, {page: "init"})

    // response 201 - long response - order
    res = http.get(
        "https://run.mocky.io/v3/be967d40-29bd-4e6f-a146-780c2bfd610e?mocky-delay=1000ms",
        {
            tags: {
                page: "order"
            }
        }
    );

    if (res.error) {
        httpErrors.add(1, {page: "order"});
    }
    
    check(
        res,
        {'status is 201': (r) => r.status === 201},
        {page: "order"}
    )

}



