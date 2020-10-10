const Transcript = artifacts.require('Transcript');

contract('Transcript', async () => {
  let transcript;
  before(async () => {
    transcript = await Transcript.deployed();
  });

  it('verifyRecord() should return TRUE for authentified transcripts', async () => {
    const student = '0x2CfB04529afeD0CEeB3e7518130e1843276C829B';
    const record = '{"Algorithms": "B", "Network Security": "A"}';
    await transcript.addRecord(student, record);
    const result = await transcript.verifyRecord(student, record);
    assert(result === true);
  });

  it('verifyRecord() should return FALSE for unauthentified transcripts (1)', async () => {
    const student = '0x63Bba01D8D9Fe2362a6Ec016972dbA0CA628C6e1';
    const record = '{"Cloud Computing": "F", "Machine Learning": "F"}';
    const fakeRecord = '{"HCI": "A", "NLP": "A"}';
    await transcript.addRecord(student, record);
    const result = await transcript.verifyRecord(student, fakeRecord);
    assert(result === false);
  });

  it('verifyRecord() should return FALSE for unauthentified transcripts (2)', async () => {
    const student = '0x1A1FD427396ae28934Ee520DB39401a5b818C2CC';
    const fakeRecord = '{"Economics": "A", "Marketing": "A"}';
    const result = await transcript.verifyRecord(student, fakeRecord);
    assert(result === false);
  });

  it('verifyRecord() should return FALSE for wrong address', async () => {
    const student1 = '0x63Bba01D8D9Fe2362a6Ec016972dbA0CA628C6e1';
    const student2 = '0x1A1FD427396ae28934Ee520DB39401a5b818C2CC';
    const record = '{"Calculus": "A", "HRI": "A"}';
    await transcript.addRecord(student1, record);
    const result = await transcript.verifyRecord(student2, record);
    assert(result === false);
  });
});
