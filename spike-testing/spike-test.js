import http from 'k6/http'
import { sleep } from 'k6'

const BASE_URL = "https://quickpizza.grafana.com";
const ROOT = "/test.k6.io"
const NEWS = "/news.php"
const CONTACTS = "/contacts.php"

export const options = {
    stages: [
        {
            duration: '30s',
            target: 1000
        },
        {
            duration: '10s',
            target: 0
        }
    ]

    
}

export default function () {
    http.get(BASE_URL + ROOT);
    sleep(1);
}