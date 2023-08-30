import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';

@Module({
  exports: [ValidateBankAccountOwnershipService],
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnershipService],
})
export class BankAccountsModule {}
