// these are made available by near-cli/test_environment
// note: do not remove the line below as it is needed for these tests
/* global nearlib, nearConfig */

import 'regenerator-runtime/runtime';

let near;
let contract;
let accountId;

beforeAll(async function() {
  near = await nearlib.connect(nearConfig);
  accountId = nearConfig.contractName;
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['getMessages'],
    changeMethods: ['addMessage'],
    sender: accountId
  });
});

it('send two more messages and expect two total', async() => {
  await contract.addMessage({ text: 'foo', 'premiumType': 0 });
  await contract.addMessage({ text: 'bar', 'premiumType': 0 });
  const msgs = await contract.getMessages();
  expect(msgs.length).toEqual(2);
});
