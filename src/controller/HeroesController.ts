import { Request, Response } from "express";
import { HeroesDatabase } from "../database/HeroesDatabase";
import { Heroes } from "../models/Heroes";
import { THero } from "../types";

export class HeroesController {
  public getHeroes = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;

      const heroesDataBase = new HeroesDatabase();
      const heroesDB = await heroesDataBase.findHeroes(q);

      const heroes: Heroes[] = heroesDB.map(
        (heroesDB) => new Heroes(heroesDB.id, heroesDB.name, heroesDB.titulo)
      );

      res.status(200).send(heroes);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public postHeroes = async (req: Request, res: Response) => {
    try {
      const { id, name, titulo } = req.body;

      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (typeof titulo !== "string") {
        res.status(400);
        throw new Error("'titulo' deve ser string");
      }

      const heroesDataBase = new HeroesDatabase();
      const heroeDBExists = await heroesDataBase.findHeroesByID(id);

      if (heroeDBExists) {
        res.status(400);
        throw new Error("'id' já existe");
      }

      const heroe = new Heroes(id, name, titulo);

      const newHeroe: THero = {
        id: heroe.getId(),
        name: heroe.getName(),
        titulo: heroe.getTitulo(),
      };

      await heroesDataBase.insertHeroes(newHeroe);

      res.status(201).send(heroe);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public putHeroes = async (req: Request, res: Response) => {
    try {
      const idToEdit = req.params.id as string;

      const newId = req.body.id;
      const newName = req.body.name;
      const newTitulo = req.body.titulo;

      const heroesDataBase = new HeroesDatabase();
      const heroesIdToEdit = await heroesDataBase.findHeroesByID(idToEdit);

      if (!heroesIdToEdit) {
        res.status(400);
        throw new Error("'id' não existe");
      }

      const heroe = new Heroes(
        heroesIdToEdit.id,
        heroesIdToEdit.name,
        heroesIdToEdit.titulo
      );

      if (newId !== undefined) {
        if (typeof newId !== "string") {
          res.status(400);
          throw new Error("'newId' deve ser string");
        }
      }

      if (newName !== undefined) {
        if (typeof newTitulo !== "string") {
          res.status(400);
          throw new Error("'newName' deve ser string");
        }
      }

      if (newTitulo !== undefined) {
        if (typeof newTitulo !== "string") {
          res.status(400);
          throw new Error("'newTitulo' deve ser string");
        }
      }

      newId && heroe.setId(newId);
      newName && heroe.setName(newName);
      newTitulo && heroe.setTitulo(newTitulo);

      const newHeroe: THero = {
        id: heroe.getId(),
        name: heroe.getName(),
        titulo: heroe.getTitulo(),
      };

      await heroesDataBase.updateHeroes(
        newHeroe.id,
        newHeroe.name,
        newHeroe.titulo
      );

      res
        .status(200)
        .send({ message: "Heroe atualizado com sucesso", newHeroe });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public deleteHeroes = async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id;

      const heroesDatabase = new HeroesDatabase();
      const heroesToDelete = await heroesDatabase.findHeroesByID(idToDelete);

      if (!heroesToDelete) {
        res.status(400);
        throw new Error("'id' não existe");
      }

      const heroe = new Heroes(
        heroesToDelete.id,
        heroesToDelete.name,
        heroesToDelete.titulo
      );

      await heroesDatabase.deleteHeroe(heroe.getId());

      res.status(200).send({ message: "Heroe deletado com sucesso" });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
