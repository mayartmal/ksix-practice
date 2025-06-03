import http from 'k6/http'
import { sleep } from 'k6'

const BASE_URL = "https://quickpizza.grafana.com/test.k6.io/"
export const options = {
    vus: 10,
    duration: '10s'
}

export default function () {
    http.get(BASE_URL);
    sleep(1);
}