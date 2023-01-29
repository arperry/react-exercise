import { v4 as uuidv4 } from "uuid";

class Todo {
  completed = false;
  private readonly _color?: string;
  private readonly _displaySequence?: number;
  private readonly _duration?: number;
  private readonly _title?: string;
  private readonly _uuid: string;

  constructor({
    color,
    completed = false,
    displaySequence,
    duration,
    title,
  }: {
    color?: string;
    completed?: boolean;
    displaySequence?: number;
    duration?: number;
    title?: string;
  }) {
    this._uuid = uuidv4();
    this._displaySequence = displaySequence;
    this._duration = Math.max(0, Math.floor(duration || 0));
    this._title = title;
    this._color = color;
    this.completed = completed;
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

  get displaySequence() {
    return this._displaySequence;
  }

  get color() {
    return this._color;
  }
}

export { Todo };
