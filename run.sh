#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]
do
    key="$1"
    
    # This enables equals-separated argument parsing
    # like --this=works
    [[ $1 == --*=* ]] && set -- "${1%%=*}" "${1#*=}" "${@:2}"
    
    case $key in
        -b|--build)
            npm run build --prefix ./client 1>./build-npm.log
            ./api/mvnw package 1>./build-java.log
            cd -
            
            shift
            shift
        ;;
        -s|--start)
            if [ ! -f ./api/target/algamoney-1.0.0.jar ]; then
                echo "Você precisa fazer o build (bash run.sh -b) antes de rodar esse comando!"
                exit
            fi
            npm run start --prefix ./client &
            java -jar ./api/target/algamoney-1.0.0.jar &
            
            shift
            shift
        ;;
        -d|--dev)
            npm run start --prefix ./client &
            cd api && ./mvnw -e spring-boot:run &
            cd -
            
            shift
            shift
        ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift
        ;;
    esac
done