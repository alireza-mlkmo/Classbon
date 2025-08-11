import { CourseSummary } from "@/types/course-summery.-interface";
import CourseCard from "./Course-card";

type CourseCardListProps = {
    courses: CourseSummary[],
}

const CourseCardList: React.FC<CourseCardListProps> = ({courses} : CourseCardListProps) => {
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
      {
        courses.map(course => {
            return <CourseCard key={`course-${course.slug}`} {...course} />;
        })
      }
    </div>
  );
};

export default CourseCardList;