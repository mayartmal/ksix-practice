import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';
import { Counter } from 'k6/metrix';


// k6 configuration
export const options = {
    // load configuration or stages
    duration: '10s',
    vus: 10,
    
    // check metrics thresholds
    thresholds:{
        http_req_duration: ['p(95)<200', 'max<2000'],
        // http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>10'],
        http_reqs: ['rate>4'],
        vus: ['value>9'],
        checks: ['rate>=0.98']
    }
}

// k6 methods and checks scenario
export default function () {
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/' + (exec.scenario.iterationInTest  === 1 ? 'foo' : ''));
    // console.log(exec.scenario.iterationInTest);


    //logic checks
    check(true, {
        'true is true': (value) => value === true
    });
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains start page title': (r) => r.body.includes('QuickPizza Legacy')

    });
    sleep(2)
}


//QuickPizza Legacy