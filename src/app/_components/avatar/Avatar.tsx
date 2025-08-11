import classNames from "classnames";
import { Size } from "../types/size.type";
import { AvatarProps } from "./avatar.types";
import Image from "next/image";
import { IconUserProfile } from "../icons";

const sizeClasses: Record<Size , number> = {
    tiny: 40,
    small: 50,
    normal: 70,
    large: 120
}

const Avatar: React.FC<AvatarProps> = ({
    variant = 'primary',
    className,
    size = 'normal',
    src,
    alt= ''
}) => { 
  const classes = classNames(
    'avatar',
    className,{
    [`avatar-${variant}`] : variant,
    [`${sizeClasses[size]}`] : size 
    })
  return (
    <div
      className={classes}
      style={{ width: sizeClasses[size], height: sizeClasses[size] }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={sizeClasses[size]}
          height={sizeClasses[size]}
        />
      ) : (
        <IconUserProfile
          width={sizeClasses[size] / 2}
          height={sizeClasses[size] / 2}
        />
      )}
    </div>
  );
};

export default Avatar;