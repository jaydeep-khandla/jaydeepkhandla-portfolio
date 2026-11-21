'use client';
import RichContent from '@/components/RichContent';
import React from 'react';
import { PinContainer } from '@/components/ui/3d-pin';
import SkillLabel from './ui/SkillLabel';
import Image, { StaticImageData } from 'next/image';

export default function AnimatedPin({
  title,
  description,
  urlTitle,
  href,
  tech,
  srcImg,
  imageAlt,
  featured,
}: {
  title: string;
  description: string;
  urlTitle: string;
  href: string;
  tech: string[];
  srcImg: string | StaticImageData;
  imageAlt: string;
  featured: boolean;
}) {
  return (
    <PinContainer title={urlTitle}>
      <div className="preview">
        {srcImg && (
          <Image
            src={srcImg}
            alt={imageAlt}
            fill
            sizes="(max-width: 860px) 100vw, 45vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="project-copy">
        {featured && <p className="eyebrow">Featured</p>}
        <h3>{title}</h3>
        <RichContent value={description} />
        <div className="chips">
          {tech.map((t, index) => (
            <SkillLabel key={index} skill={t} />
          ))}
        </div>
        <a className="text-link project-destination" href={href} target="_blank" rel="noreferrer">{urlTitle} ↗</a>
      </div>
    </PinContainer>
  );
}
