// imports
import http from "k6/http"
import { sleep } from "k6"

// options and threatholds 
export const options = {
    vus: 1,
    duration: "5s"
}

// custome metrics


// logic

console.log("----- INIT STAGE -----")


export function setup() {
    console.log("----- SETUP STAGE -----");
    sleep(10);
    const data = { foo:"bar" };
    return data;
}

export default function (data) {
    console.log("----- VUS STAGE -----");
    // console.log(data);
    sleep(1);
}

export function teardown() {
    console.log("----- TEARDOWN STAGE -----")
}

