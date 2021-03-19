import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export default class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `PK_${table}_${columnsSnakeCase}`;
  }
}
