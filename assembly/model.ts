import { context, u128, PersistentDeque, PersistentMap } from "near-sdk-as";

const NO_PREMIUM_TYPE = 0;
/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  amount: u128;
  timestamp: u64;
  premiumType: i32;
  constructor(public text: string, premiumType: i32) {
    this.amount = context.attachedDeposit;
    this.timestamp = context.blockTimestamp
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
    if (this.premium) {
      this.premiumType = premiumType
    } else {
      this.premiumType = NO_PREMIUM_TYPE;
    }
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentDeque<PostedMessage>("q");

export const mapSign = new PersistentMap<string, PostedMessage>("m");
