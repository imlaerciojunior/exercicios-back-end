import express, { Request, Response } from "express";
import cors from "cors";
import { THero, TVideo } from "./types";
//import { db } from "./database/knex";
import { Video } from "./models/Video";
import { VideoDatabase } from "./database/VideoDatabase";
import { Heroes } from "./models/Heroes";
import { HeroesDatabase } from "./database/HeroesDatabase";
import { VideoController } from "./controller/VideoController";
import { HeroesController } from "./controller/HeroesController";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
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
});


//------------VIDEOS---------------

const videoController = new VideoController()

app.get("/videos", videoController.getVideos);

app.post("/videos", videoController.postVideos);

app.put("/videos/:id", videoController.putVideos);

app.delete("/videos/:id", videoController.deleteVideos);


//---------------------- HEROES ------------------

const heroesController = new HeroesController()

app.get("/heroes", heroesController.getHeroes);

app.post("/heroes", heroesController.postHeroes);

app.put("/heroes/:id", heroesController.putHeroes);

app.delete("/heroes/:id", heroesController.deleteHeroes);


