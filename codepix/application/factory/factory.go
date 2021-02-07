package factory

import (
	"github.com/jinzhu/gorm"
	"github.com/loxt/imersao-fullstack-fullcycle/codepix/application/usecase"
	"github.com/loxt/imersao-fullstack-fullcycle/codepix/infra/repository"
)

func TransactionUseCaseFactory(database *gorm.DB) *usecase.TransactionUseCase {
	transactionRepository := repository.TransactionRepositoryDb{Db: database}
	pixRepository := repository.PixKeyRepositoryDb{Db: database}

	transactionUseCase := usecase.TransactionUseCase{
		TransactionRepository: &transactionRepository,
		PixRepository:         &pixRepository,
	}

	return &transactionUseCase
}
