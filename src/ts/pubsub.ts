/**
 * Copied and adapted from Spotlight 
 * @see pubsub.js
**/ 

let subscribers: any = {};

export function subscribe(
  eventName: string,
  callback: (data: unknown) => void,
) {
  if (subscribers[eventName] === undefined) {
    subscribers[eventName] = [];
  }

  subscribers[eventName] = [...subscribers[eventName], callback];

  return function unsubscribe() {
    subscribers[eventName] = subscribers[eventName].filter((cb: any) => {
      return cb !== callback;
    });
  };
}

export function publish(eventName: string, data: unknown) {
  if (subscribers[eventName]) {
    subscribers[eventName].forEach((callback: (data: any) => void) => {
      callback(data);
    });
  }
}
