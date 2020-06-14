import { createConnection, getConnectionOptions, getConnection } from "typeorm";

export default async () => {

  let name = process.env.APP_ENV === 'prod' ? 'prod' : 'default';

  const connectionOptions = await getConnectionOptions(name);
  await createConnection({ ...connectionOptions, name: name })
  .then(connection => {
    console.log('typeORM ~ ')
}).catch(error => console.log(error));;
};

export const closeDatabaseConn = async () => {
  getConnection().close();
};