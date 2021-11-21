import { addMessage, getMessages } from '../main';
import { PostedMessage, messages } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createMessage(text: string, premiumType: i32=0): PostedMessage {
  return new PostedMessage(text, premiumType);
}

const message = createMessage('hello world');

describe('message tests', () => {
  afterEach(() => {
    while(messages.length > 0) {
      messages.popBack();
    }
  });

  it('adds a message', () => {
    addMessage('hello world', 0);
    expect(messages.length).toBe(
      1,
      'should only contain one message'
    );
    expect(messages[0]).toStrictEqual(
      message,
      'message should be "hello world"'
    );
  });

  it('adds a premium message', () => {
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    addMessage('hello world', 0);
    const messageAR = getMessages();
    expect(messageAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves messages', () => {
    addMessage('hello world', 0);
    const messagesArr = getMessages();
    expect(messagesArr.length).toBe(
      1,
      'should be one message'
    );
    expect(messagesArr).toIncludeEqual(
      message,
      'messages should include:\n' + message.toJSON()
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addMessage('hello world', 0);
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
