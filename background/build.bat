call mvn -DskipTests package
call docker rmi sadolin/portal:v1
call docker build -t sadolin/portal:v1 .
call docker push sadolin/portal:v1