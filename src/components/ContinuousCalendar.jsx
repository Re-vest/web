import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { Event } from './Event';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


export const ContinuousCalendar = ({ fullHeight = false, onClick, setIsModalOpen, setDate, events }) => {
  const today = new Date();
  const dayRefs = useRef([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

  const scrollToDay = (monthIndex, dayIndex) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) => ref && ref.getAttribute('data-month') === `${monthIndex}` && ref.getAttribute('data-day') === `${dayIndex}`,
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector('.calendar-container');
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia('(min-width: 1536px)').matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top - (containerRect.height / offsetFactor) + (elementRect.height / 2);

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: 'smooth',
        });
      } else {
        const offset = window.scrollY + elementRect.top - (window.innerHeight / offsetFactor) + (elementRect.height / 2);

        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };

  const handleDayClick = (day, month, year) => {
    const date = new Date(year, month, day)
    setDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(parseInt(date.getDate(), 10)).padStart(2, '0')}`)
    setIsModalOpen(true)
    if (!onClick) { return; }
    if (month < 0) {
      onClick(day, 11, year - 1);
    } else {
      onClick(day, month, year);
    }
  }

  const generateCalendar = useMemo(() => {
    const daysOfYear = () => {
      const daysOfYear = [];

      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          daysOfYear.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysOfYear.push({ month, day });
        }
      }

      return daysOfYear;
    };

    const calendarDays = daysOfYear();

    console.log(events)

    const calendar = calendarDays.map(({ month, day }, index) => {
      const isNewMonth = index === 0 || calendarDays[index - 1].month !== month;
      const isToday = today.getMonth() === month && today.getDate() === day && today.getFullYear() === year;

      const eventsForDay = events.filter(event => {
        const eventStart = event.startAt;
        const eventEnd = event.endAt;

        const currentDate = new Date(year, month, day);
        // console.log(eventEnd)
        // console.log(currentDate)
        // console.log(currentDate >= eventStart && currentDate <= eventEnd)
        return currentDate >= eventStart && currentDate <= eventEnd;
      });


      return (
        <div
          key={`${month}-${day}`}
          ref={(el) => { dayRefs.current[index] = el; }}
          data-month={month}
          data-day={day}
          onClick={() => handleDayClick(day, month, year)}
          className={`relative z-10 m-[-0.5px] aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-28 lg:rounded-3xl 2xl:size-40 text-center flex flex-col items-start justify-between px-2 py-2`}
        >
          {
            eventsForDay.length < 3 ? (
              <span className={`w-full h-fit flex flex-col items-start rounded-full text-xs lg:text-base ${isToday ? 'bg-blue-500 font-semibold text-white' : ''} ${month < 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                {day}
                <div className='w-full flex flex-col gap-1'>
                  {eventsForDay.map(event => <Event key={event.id} color={event.color} title={event.title} />)}
                </div>
              </span>

            ) : (

              <span className={`w-full h-fit flex justify-between rounded-full text-xs lg:text-base ${isToday ? 'bg-blue-500 font-semibold text-white' : ''} ${month < 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                {day}
                <div className='grid grid-flow-col grid-rows-3 gap-1'>
                  {eventsForDay.map(event => <Event key={event.id} color={event.color} />)}
                </div>
              </span>

            )
          }



          {isNewMonth && (
            <span className="w-full truncate px-1.5 text-sm font-semibold text-slate-300 lg:-mb-1 lg:px-0 lg:text-lg 2xl:mb-[-4px] 2xl:text-2xl right-0 text-end">
              {monthNames[month]}
            </span>
          )}
        </div>
      );
    });

    return calendar;
  }, [year, events]);

  useEffect(() => {
    const root = document.querySelector('.calendar-container') || document;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(entry.target.getAttribute('data-month'), 10);
            setSelectedMonth(month);
          }
        });
      },
      {
        root,
        rootMargin: '-75% 0px -25% 0px',
        threshold: 0,
      },
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute('data-day') === '15') {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`rounded-2xl bg-white pb-10 text-slate-800 ${fullHeight ? '' : 'calendar-container h-full overflow-y-scroll'}`}>
        <div className="sticky -top-px z-50 w-full bg-white px-5 pt-7 sm:px-10 sm:pt-10">
          <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Select name="" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />
              <button onClick={handleTodayClick} type="button" className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl lg:px-5 lg:py-2.5">
                Hoje
              </button>
              <button type="button" className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-5 lg:py-2.5"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={15} /> Criar evento
              </button>
            </div>
            <div className="flex w-fit items-center justify-between">
              <button
                onClick={handlePrevYear}
                className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
              >
                <svg className="size-5 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                </svg>
              </button>
              <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">{year}</h1>
              <button
                onClick={handleNextYear}
                className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
              >
                <svg className="size-5 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid w-full grid-cols-7 justify-between text-slate-500">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="w-full border-b border-slate-200 py-2 text-center font-semibold">
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full grid-cols-7 px-5 pt-4 sm:px-10 sm:pt-6">
          {generateCalendar}
        </div>
      </div>
    </>
  );
};

export const Select = ({ name, value, label, options = [], onChange, className }) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg className="size-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
);