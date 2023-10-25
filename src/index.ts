import express, { Request, Response } from "express";
import cors from "cors";
import { TVideo } from "./types";
import { db } from "./database/knex";
import { Video } from "./models/Video";

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

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const q = req.query.q;

    let videosDB;

    if (q) {
      const result: TVideo[] = await db("videos").where(
        "titulo",
        "LIKE",
        `%${q}%`
      );
      videosDB = result;
    } else {
      const result: TVideo[] = await db("videos");
      videosDB = result;
    }

    const videos: Video[] = videosDB.map(
      (videosDB) =>
        new Video(
          videosDB.id,
          videosDB.titulo,
          videosDB.duracao,
          videosDB.data_update
        )
    );

    res.status(200).send(videos);
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

app.post("/videos", async (req: Request, res: Response) => {
  try {
    const { id, titulo, duracao } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }

    if (typeof titulo !== "string") {
      res.status(400);
      throw new Error("'titulo' deve ser string");
    }

    if (typeof duracao !== "number") {
      res.status(400);
      throw new Error("'duração' deve ser number");
    }

    const [videoDBExists]: TVideo[] | undefined[] = await db("videos").where({
      id,
    });

    if (videoDBExists) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    const video = new Video(id, titulo, duracao, new Date().toISOString());

    const newVideo: TVideo = {
      id: video.getId(),
      titulo: video.getTitulo(),
      duracao: video.getDuracao(),
      data_update: video.getDataUpdate(),
    };

    await db("videos").insert(newVideo);
    const [videoDB]: TVideo[] = await db("videos").where({ id });

    res.status(201).send(videoDB);
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

app.put("/videos/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.newId as string;
    const newTitulo = req.body.newTitulo as string;
    const newDuracao = req.body.newDuracao as number;

    const [videoDB] = await db("videos").where({ id: idToEdit });

    if (!videoDB) {
      res.status(400);
      throw new Error("'id' não existe");
    }

    const video = new Video(
      videoDB.id,
      videoDB.titulo,
      videoDB.duracao,
      videoDB.data_upload
    );

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'newId' deve ser string");
      }
    }

    if (newTitulo !== undefined) {
      if (typeof newTitulo !== "string") {
        res.status(400);
        throw new Error("'newTitulo' deve ser string");
      }
    }

    if (newDuracao !== undefined) {
      if (typeof newDuracao !== "number") {
        res.status(400);
        throw new Error("'newDuracao' deve ser number");
      }
    }

    newId && video.setId(newId);
    newTitulo && video.setTitulo(newTitulo);
    newDuracao && video.setDuracao(newDuracao);

    const newVideo: TVideo = {
      id: video.getId(),
      titulo: video.getTitulo(),
      duracao: video.getDuracao(),
      data_update: video.getDataUpdate(),
    };

    await db("videos").update(newVideo).where({ id: idToEdit });

    res.status(200).send({ message: "Video atualizado com sucesso", newVideo });
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

app.delete("/videos/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [videoDB] = await db("videos").where({ id: idToDelete });

    if (!videoDB) {
      res.status(400);
      throw new Error("'id' não existe");
    }

    const video = new Video(
      videoDB.id,
      videoDB.titulo,
      videoDB.duracao,
      videoDB.data_update
    );

    await db("videos").delete().where({ id: video.getId() });

    res.status(200).send({ message: "Video deletado com sucesso" });
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
