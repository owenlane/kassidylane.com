import { stats } from "@/content/stats";
import { CountUp } from "@/components/ui/CountUp";

export function StatBand() {
  return (
    <section className="bg-ink text-bone" aria-label="Track record">
      <div className="container-page py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center md:text-left ${
                i === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-bone">
                {stat.value !== null ? (
                  <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  <span className="text-[clamp(1.5rem,3.5vw,2.25rem)]">{stat.display}</span>
                )}
              </div>
              <div className="mt-2.5 font-mono text-[0.7rem] uppercase leading-snug tracking-[0.1em] text-bone/55">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
