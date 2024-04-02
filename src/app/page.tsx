import { TravelLogs } from '@/lib/logs/TravelLogModel';
import TravelLogMap from './components/TravelLogMap';
import TravelLogSidebar from './components/TravelLogSidebar';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main className="w-full h-full">
      <TravelLogMap logs={JSON.parse(JSON.stringify(logs))} />
      <TravelLogSidebar />
    </main>
  );
}
