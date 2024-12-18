import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return { id, ...data };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });
  }

  create(video) {
    const id = randomUUID();
    this.#videos.set(id, video);
  }

  update(id, video) {
    if (this.#videos.has(id)) {
      this.#videos.set(id, video);
    } else {
      throw new Error("Video not found");
    }
  }

  delete(id) {
    if (this.#videos.has(id)) {
      this.#videos.delete(id);
    } else {
      throw new Error("Video not found");
    }
  }
}
