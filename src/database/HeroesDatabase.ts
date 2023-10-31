import { THero } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class HeroesDatabase extends BaseDatabase {
  public static TABLE_HEROES = "super_heroes";

  public async findHeroes(q: string) {
    let heroesDB;

    if (q) {
      const result: THero[] = await BaseDatabase.connection(
        HeroesDatabase.TABLE_HEROES
      ).where("titulo", "LIKE", `%${q}%`);

      heroesDB = result;
    } else {
      const result: THero[] = await BaseDatabase.connection(
        HeroesDatabase.TABLE_HEROES
      );
      heroesDB = result;
    }
    return heroesDB;
  }

  public async findHeroesByID (id: string) {
    const [ heroesDB ]: THero[] | undefined[] = await BaseDatabase
    .connection(HeroesDatabase.TABLE_HEROES).where({ id })

    return heroesDB
  }

  public async insertHeroes(newId: THero): Promise<void> {
    await BaseDatabase
    .connection(HeroesDatabase.TABLE_HEROES)
    .insert(newId)
  }

  public async updateHeroes(id: string, name: string, titulo: string): Promise<void> {
    await BaseDatabase
        .connection(HeroesDatabase.TABLE_HEROES)
        .where({ id }) 
        .update({id, name, titulo })
}

public async deleteHeroe(id: string): Promise<void> {
  await BaseDatabase
      .connection(HeroesDatabase.TABLE_HEROES)
      .where({ id: id })
      .delete();
}
}