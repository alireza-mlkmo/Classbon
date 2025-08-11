import Button from "../button/Button";
import { IconArrowLeftFill } from "../icons";

const ReactNextSection: React.FC = () => {
  return (
    <section className="px-2 my-40">
      {/* <div className="sticky top-0 pt-0 text-center"> */}
      <div className="relative pt-0 text-center">
        <div className="bg-primary pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2 -top-96 rounded-full opacity-10 blur-3xl"></div>

        <h2
          lang="en"
          className="gradient leading-[1.3] relative z-10 mx-auto inline-block text-[clamp(2rem,6vw,5.5rem)] font-black"
        >
          ReactJs & Next.js
        </h2>
        <p className="text-base-content/70  relative z-[2] py-4 m-auto md:text-3xl max-w-5xl font-light !leading-[1.7]">
          ری‌اکت و نکست‌جی‌اس برترین کتابخونه‌های فرانت‌اند و یکه‌تاز دنیای وب!
          پیشرفته‌ترین مباحث رو اینجا می تونی پیدا کنی. پس همین الان یادگیری رو
          شروع کن ما هم از ابتدای مسیر با آموزش‌های تخصصی و کاملاً کاربردی کنارت
          هستیم.
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-3 justify-center">
          <Button
            variant="primary"
            size="large"
            className="mt-7"
            animatedIcon={true}
          >
            دوره‌های ری اکت و نکست‌ جی‌اس
            <IconArrowLeftFill fill="currentColor" />
          </Button>
          <Button
            variant="neutral"
            size="large"
            className="mt-7"
            animatedIcon={true}
          >
            مقالات ری اکت و نکست‌ جی‌اس
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReactNextSection;