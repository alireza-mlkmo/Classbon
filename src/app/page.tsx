import { CourseSummary } from "@/types/course-summery.-interface";
import HomeHeroSection from "./_components/home-hero-section/Home-hero-section";
import CourseCardList from "./(courses)/_components/Course-card-list";
import { homeFeatures } from "@/data/home-features";
import Feature from "./_components/feature/Feature";
import ReactNextSection from "./_components/react-next-section/React-Next-Section";
import { BlogPostSummery } from "@/types/blog-post-summery.interface";
import { BlogPostCardList } from "./(blog)/_components/blog-post-card-list";
import { IconArrowLeftFill } from "./_components/icons";
import Button from "./_components/button/Button";
import { API_URL } from "@/configs/global";
import { TestimonialList } from "./_components/testimonial/Testimonial-list";
import { testimonials } from "@/data/testimonial";

async function getNewestCourses(count: number): Promise<CourseSummary[]> {
  const res = await fetch(
    `${API_URL}/courses/newest/${count}` , {
      next:{
        revalidate:20
      }
    }
  );
  return res.json();
}
async function getNewestPosts(count: number): Promise<BlogPostSummery[]> {
  const res = await fetch(`${API_URL}/blog/newest/${count}`, {
    next: {
      revalidate: 20,
    },
  });
  return res.json();
}

export default async function Home() {
  const [newestCourses , newestBlogPosts] = await Promise.all([getNewestCourses(4) , getNewestPosts(4)])
  console.log("DATA:" + newestBlogPosts);
  
  return (
    <>
      <HomeHeroSection />
      <section className="bg-base-75 mt-10">
        <div className="container py-10 flex flex-col lg:flex-row gap-10 xl:gap-5">
          {homeFeatures.map((feature) => (
            <Feature key={feature.title} feature={feature} />
          ))}
        </div>
      </section>
      <section className="container  pt-20">
        <div className="text-center xl:text-right">
          <h2 className="text-2xl font-extrabold">تازه ترین دوره های آموزشی</h2>
          <p className="mt-3 text-lg">
            برای به‌روز موندن، یاد گرفتن نکته‌های تازه ضروری‌ه!
          </p>
        </div>
        <CourseCardList courses={newestCourses} />
      </section>
      <ReactNextSection />
      <section className="container py-20">
        <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-between items-center">
          <div className="text-center xl:text-right">
            <h2 className="text-2xl font-extrabold">
              تازه‌ترین مقاله‌های آموزشی
            </h2>
            <p className="mt-3 text-lg">
              به رایگان، به‌روزترین مقاله‌های دنیای تکنولوژی رو در اختیارت
              می‌ذاریم؛ چون پیشرفتت برامون مهمه!
            </p>
          </div>
          <Button
            variant="neutral"
            className="font-semibold"
            animatedIcon={true}
          >
            همه مقاله‌ها
            <IconArrowLeftFill fill="currentColor" />
          </Button>
        </div>
        <BlogPostCardList posts={newestBlogPosts} />
      </section>

      <div className="relative mt-32">
        <div className="bg-primary pointer-events-none absolute bottom-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full opacity-5 -top-52 blur-3xl"></div>
        <h2 className="text-info relative z-0 mx-auto text-3xl font-extrabold block w-fit">
          <span className="-z-10 w-8 h-8 absolute bg-info opacity-25 -top-2 rounded-full inline-block -right-3"></span>
          تجربه هم‌میسرهای کلاسبن
        </h2>
        <p className=" mb-32 text-lg text-center mt-2">
          تو اینجا تنها نیستی. ببین هم‌مسیرهات نظرشون در مورد دوره‌های کلاسبن
          چیه
        </p>
        <TestimonialList testimonials={testimonials} />
      </div>
    </>
  );
}
