import * as PubSub from 'pubsub-js';
import {Topics} from './strings';

const EventBus = PubSub;
export {PubSub, EventBus, Topics};

export default PubSub;
