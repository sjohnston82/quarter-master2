import Image from 'next/image';
import React from 'react'

interface FeatureListItemProps {
  text: string;
}

const FeatureListItem = ({ text }: FeatureListItemProps) => {
  return (
    <li className="flex w-full items-center gap-3">
      <Image
        src="/img/fork-spoon.webp"
        alt="forkspoon"
        width={80}
        height={80}
        className="w-1/5"
      />
      <span className="w-4/5">
        {text}
      </span>
    </li>
  );
}

export default FeatureListItem