#!/bin/bash

# Use for loop in $@ to accept all args
for input in "$@"
do
    echo "$input"
done
