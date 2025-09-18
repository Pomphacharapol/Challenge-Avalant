'use client'

import { Tree } from "@/components/tree";

export default function TreePage() {
  return (
    <div className='p-10 flex flex-col justify-center gap-5'>
      <h1 className='text-center'>Challenge 2</h1>
      <h2 className='text-center'>Org Chart / File Explorer</h2>
      <Tree />
    </div>
  );
}