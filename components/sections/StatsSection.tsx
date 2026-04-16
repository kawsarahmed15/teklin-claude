import { CountUp } from "@/components/animations/CountUp";
import { FadeIn } from "@/components/animations/FadeIn";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="py-16 border-y border-[#18181B] bg-[#09090B] dark:bg-[#09090B]">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#18181B]">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center lg:px-8">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="gradient-text"
                />
              </div>
              <p className="text-[#71717A] text-sm tracking-wide">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
