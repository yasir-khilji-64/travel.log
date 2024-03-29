import { TravelLogs } from '@/lib/logs/TravelLogModel';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main className="flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1>Total travel logs: {logs.length}</h1>
        {logs.map((log) => {
          return <h1 key={log._id.toHexString()}>{log.title}</h1>;
        })}
      </div>
    </main>
  );
}
