import { Console, Command } from 'nestjs-console';
import { getConnection } from 'typeorm';
import * as chalk from 'chalk';
import fixtures from './fixtures/bank-001';

@Console()
export class FixturesCommand {
  @Command({
    command: 'fixtures',
    description: 'Seed data in database',
  })
  async command() {
    await this.runMigrations();
    const fixures = (await import(`./fixtures/bank-${process.env.BANK_CODE}`))
      .default;
    for (const fixture of fixtures) {
      await this.createInDatabase(fixture.model, fixture.fields);
    }

    console.log(chalk.green('Data generated'));
  }

  async runMigrations() {
    const conn = getConnection('default');
    for (const migration of conn.migrations.reverse()) {
      await conn.undoLastMigration();
    }
  }

  async createInDatabase(model: any, data: any) {
    const repository = this.getRepository(model);
    const obj = repository.create(data);
    return repository.save(obj);
  }

  getRepository(model: any) {
    const conn = getConnection('default');
    return conn.getRepository(model);
  }
}
