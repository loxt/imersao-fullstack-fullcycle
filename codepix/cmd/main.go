package main

import (
	"github.com/jinzhu/gorm"
	"github.com/loxt/imersao-fullstack-fullcycle/codepix/application/grpc"
	"github.com/loxt/imersao-fullstack-fullcycle/codepix/infra/db"
	"os"
)

var database *gorm.DB

func main() {
	database = db.ConnectDB(os.Getenv("env"))
	grpc.StartGrpcServer(database, 8081)
}
