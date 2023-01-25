import { v4 as uuidv4 } from "uuid";

class Todo {
  private readonly _uuid: string;
  private readonly _title: string;
  private readonly _duration: number;
  private readonly _completed: boolean;

  constructor({
    title,
    duration,
    completed = false,
    uuid = uuidv4()
  }: {
    title: string;
    duration: number;
    completed: boolean;
    uuid?: string
  }) {
    this._uuid = uuid;
    this._title = title;
    this._duration = Math.max(0, Math.floor(duration));
    this._completed = completed;
  }

  get uuid() {
    return this._uuid;
  }

  get duration() {
    return this._duration;
  }

  get title() {
    return this._title;
  }
  get completed() {
    return this._completed;
  }
}

export { Todo };
