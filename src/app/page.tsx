// import { TravelLogs } from '@/lib/logs/TravelLogModel';
import { TravelLogForm } from './components/TravelLogForm';

export default async function Home() {
  // const logs = await TravelLogs.find().toArray();
  return (
    <main>
      <div>
        {/* <h1>Total travel logs: {logs.length}</h1>
        {logs.map((log) => {
          return <h1 key={log._id.toHexString()}>{log.title}</h1>;
        })} */}
        <TravelLogForm />
      </div>
    </main>
  );
}
