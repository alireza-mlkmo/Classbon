import Badge from "@/app/_components/badge/Badge";
import { IconArrowLeft, IconClock } from "@/app/_components/icons";
import Price from "@/app/_components/price/price";
import { CourseSummary } from "@/types/course-summery.-interface";
import Image from "next/image";
import Link from "next/link";

export type CourseCardProps = CourseSummary & {};

const CourseCard: React.FC<CourseCardProps> = ({
  coverImageId,
  title,
  subTitle,
  level,
  recordStatus,
  basePrice,
  duration,
  slug,
}: CourseCardProps) => {
  return (
    <div className="card">
      <figure>
        <Image
          src={`https://api.classbon.com/api/picture/${coverImageId}`}
          alt={title}
          width={550}
          height={327}
        />
      </figure>
      <div className="flex gap-2 font-semibold text-info px-3 py-2 mt-2 ">
        <Badge variant="info">{recordStatus}</Badge>

        <Badge variant="accent">{level}</Badge>
      </div>
      <div className="card-body">
        <div className="">
          <Link href={`/course/${slug}`}>{title}</Link>
          <p className="mt-2">{subTitle}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <Badge variant="warning">
            <IconClock width={16} height={16} />
            {duration}
          </Badge>
          <Price price={basePrice} size="small"/>
        </div>
      </div>
      <Link
        className="animated-icon card-footer justify-center"
        href={`/courses/${slug}`}
      >
        مشاهده جزییات دوره
        <IconArrowLeft fill="currentColor" />
      </Link>
    </div>
  );
};

export default CourseCard;
