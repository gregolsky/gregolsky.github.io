#!/bin/bash

curl --header \
    'Authorization: key=AAAAGe7XcKU:APA91bEETlzgJBCootWt4AQFGjrQmx3y3w_sRdu_JjougQ0_19I1AE3O35ETfFEreRmDIcS1kQ89nqS7ofDsulQh1DGjSxGJHr68OHy1dfXfOHp7R-WDWfXArx0bLdlZHqmrg3MGsY8K' \
    --header 'Content-Type: application/json' \
    -d '{"registration_ids": [ "cfvUL5ZjPX8:APA91bEOUwd8QQLzM5-tP_R23UiFguGAoGblNH9tcafzUXOQzaEArNNC5-xuYvNdAZSulLC85bp8neaYIs3G1lqfT7IgdSmdPm3veon2JJf1ztKbTipz6IDSHcbrYw1WfrZNtUUpf8G2"], "notification": { "title": "asdfg z z", "message": "aaa" }}' \
    https://android.googleapis.com/gcm/send 

