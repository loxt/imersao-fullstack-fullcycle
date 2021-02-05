package model

import (
	"github.com/asaskevich/govalidator"
	uuid "github.com/satori/go.uuid"
	"time"
)

type Account struct {
	Base      `json:"base" valid:"required"`
	OwnerName string    `json:"owner_name,omitempty" valid:"notnull"`
	Bank      *Bank     `json:"bank,omitempty" valid:"-"`
	Number    string    `json:"number,omitempty" valid:"notnull"`
	PixKeys   []*PixKey `valid:"-"`
}

func (account *Account) isValid() error {
	_, err := govalidator.ValidateStruct(account)
	if err != nil {
		return err
	}

	return nil
}

func NewAccount(bank *Bank, number string, ownerName string) (*Account, error) {
	account := Account{
		OwnerName: ownerName,
		Bank:      bank,
		Number:    number,
	}

	account.ID = uuid.NewV4().String()
	account.CreatedAt = time.Now()
	account.UpdatedAt = time.Now()

	err := account.isValid()

	if err != nil {
		return nil, err
	}

	return &account, nil
}
