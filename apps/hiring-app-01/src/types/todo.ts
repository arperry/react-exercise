import { v4 as uuidv4 } from 'uuid';

class Todo {
  private readonly _uuid: string;
  private readonly _title: string;
  private readonly _duration: number;
  public _urgent;
  completed = false;

  constructor({ title, duration }: { title: string; duration: number }) {
    this._uuid = uuidv4();
    this._title = title;
    this._duration = Math.max(0, Math.floor(duration));
    this._urgent = false;
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

  get urgent() {
    return this._urgent;
  }

  set urgent(flag: boolean) {
    this._urgent = flag;
  }
}

export { Todo };
