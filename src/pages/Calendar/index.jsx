import { Calendar } from "lucide-react";
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";
import { ContinuousCalendar } from "../../components/ContinuousCalendar";

export function CalendarPage() {
  return (
    <div className="h-full w-full flex">
      <Navbar />
      <div className="flex flex-col gap-5 py-10 px-10">
        <h1 className="text-4xl font-bold">Gerenciar Eventos</h1>
        <div>
          <Button text="Novo Evento" secondary icon={<Calendar size={24} />} />
        </div>

        <div className="">

        </div>

        <ContinuousCalendar />

        </div>
    </div>
  )
}