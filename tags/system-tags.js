//imports
import http from 'k6/http'


//options incl. thtesholds
export const options = {
    thresholds: {
        'http_req_duration{status:200}': ['p(95)<100'],
        'http_req_duration{status:201}': ['p(95)<2000']
    }
}



//custome metrics

//requests incl. checks
//use designer.mocky.iochecks to generate api reqs below

export default function () {
    http.get("https://run.mocky.io/v3/ad4793b2-6389-43ba-863d-65249b6a7dcc");
    http.get("https://run.mocky.io/v3/be967d40-29bd-4e6f-a146-780c2bfd610e?mocky-delay=1000ms");
}
