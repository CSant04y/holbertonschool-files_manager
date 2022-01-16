import dbClient from './utils/db';

const waitConnection = () => new Promise((resolve, reject) => {
  let i = 0;
  const repeatFct = async () => {
    await setTimeout(() => {
      i += 1;
      console.log(`This ic count: ${i}`);
      if (i >= 10) {
        console.log('error');
        reject();
      } else if (!dbClient.isAlive()) {
        console.log('Repeating');
        repeatFct();
      } else {
        console.log('Resolve');
        resolve();
      }
    }, 1000);
  };
  repeatFct();
});

(async () => {
  console.log(dbClient.isAlive());
  await waitConnection();
  console.log(dbClient.isAlive());
  console.log(await dbClient.nbUsers());
  console.log(await dbClient.nbFiles());
})();
