import { Divider } from '@mui/material';
import Image from 'next/image';
import React from 'react'

interface FeatureListItemProps {
  text: string;
}

const FeatureListItem = ({ text }: FeatureListItemProps) => {
  return (
    <li className="flex w-full items-center   justify-center gap-3">
      <Image
        src="/img/fork-spoon.webp"
        alt="forkspoon"
        width={40}
        height={40}
        className=""
      />
      <span className="w-4/5 sm:w-3/5">{text}</span>
      {/* <Divider variant="middle" color="#000000" /> */}
    </li>
  );
}

export default FeatureListItem