import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default new EventEmitter() as TypedEmitter<{ [key: string]: any }>;
