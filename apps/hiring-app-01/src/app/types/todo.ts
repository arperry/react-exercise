import { v4 as uuidv4 } from 'uuid';

class Todo {
  private readonly _uuid: string;
  private readonly _title: string;
  private readonly _duration: number;
  completed = false;

  constructor({ title, duration }: { title: string; duration: number }) {
    this._uuid = uuidv4();
    this._title = title;
    this._duration = Math.max(0, Math.floor(duration));
  }

  get uuid() {
    return this._uuid;
  }

  get_duration() {
    return this._duration;
  }

  get title() {
    return this._title;
  }
}

export { Todo };
