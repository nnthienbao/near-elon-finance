import { context } from 'near-sdk-core';
import { PostedMessage, messages, mapSign } from './model';

// --- contract code goes below

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string, premiumType: i32): void {
  assert(
    !mapSign.contains(context.sender),
    "Sorry, you only sign the guest book once"
  );
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text, premiumType);
  // Adding the message to end of the the persistent collection
  messages.pushFront(message);
  mapSign.set(context.sender, message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = messages.length;
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}

export function checkIsSign(accountId: string): bool {
  return mapSign.contains(accountId);
}