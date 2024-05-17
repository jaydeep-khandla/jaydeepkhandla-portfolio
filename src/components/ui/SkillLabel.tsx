import React from 'react';

export default function SkillLabel({ skill }: { skill: string}) {
  return (
    <span className='text-fira h-fit w-fit border-[1px] border-white rounded-3xl my-[0.0625rem] px-3 py-1 hover:bg-white hover:text-black text-sm'>
      {skill}
    </span>
  );
}
