import http from "k6/http"
import { sleep } from "k6"
import exec from "k6/execution"


export const options = {
    vus: 10,
    duration: "60s"
}

export function setup() {
    let res =  http.get('https://quickpizza.grafana.local/status');
    if (res.error) {
        exec.test.abort("Aborted. App is down");
    }
}


export default function () {
    http.get('https://quickpizza.grafana.local/somepage')
    sleep(1)
}