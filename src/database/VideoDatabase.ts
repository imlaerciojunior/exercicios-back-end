import { TVideo } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class VideoDatabase extends BaseDatabase {
  public static TABLE_VIDEOS = "videos";

  public async findVideos(q: string) {
    let videosDB;

    if (q) {
      const result: TVideo[] = await BaseDatabase.connection(
        VideoDatabase.TABLE_VIDEOS
      ).where("titulo", "LIKE", `%${q}%`);

      videosDB = result;
    } else {
      const result: TVideo[] = await BaseDatabase.connection(
        VideoDatabase.TABLE_VIDEOS
      );
      videosDB = result;
    }
    return videosDB;
  }

  public async findVideoByID (id: string) {
    const [ videosDB ]: TVideo[] | undefined[] = await BaseDatabase
    .connection(VideoDatabase.TABLE_VIDEOS).where({ id })

    return videosDB
  }

  public async insertVideo(newId: TVideo): Promise<void> {
    await BaseDatabase
    .connection(VideoDatabase.TABLE_VIDEOS)
    .insert(newId)
  }

  public async updateVideo(id: string, titulo: string, duracao: number): Promise<void> {
    await BaseDatabase
        .connection(VideoDatabase.TABLE_VIDEOS)
        .where({ id }) 
        .update({id, titulo, duracao })
}

public async deleteVideo(id: string): Promise<void> {
  await BaseDatabase
      .connection(VideoDatabase.TABLE_VIDEOS)
      .where({ id: id })
      .delete();
}
}
