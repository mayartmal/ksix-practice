import http from 'k6/http'
import { sleep } from 'k6'

const BASE_URL = "https://quickpizza.grafana.com";
const ROOT = "/test.k6.io"
const NEWS = "/news.php"
const CONTACTS = "/contacts.php"

export const options = {
    vus: 1,
    duration: '30s'
}

export default function () {
    http.get(BASE_URL + ROOT)
    // http.get('https://quickpizza.grafana.local' + ROOT)
    sleep(1);
    http.get(BASE_URL + NEWS)
    sleep(2);
    http.get(BASE_URL + CONTACTS)
    sleep(2);
}