import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BankAccount } from '../../models/bank-account.model';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('bank-accounts')
export class BankAccountController {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepo: Repository<BankAccount>,
  ) {}

  @Get()
  index() {
    return this.bankAccountRepo.find();
  }

  @Get(':bankAccountId')
  show(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    bankAccountId: string,
  ) {
    return this.bankAccountRepo.findOneOrFail(bankAccountId);
  }
}
