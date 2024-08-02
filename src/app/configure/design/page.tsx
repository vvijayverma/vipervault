import { notFound } from 'next/navigation';
import React from 'react';
import { db } from '@/db';
// import DesignConfigurator from './DesignConfigurator';


interface PageProps{
  searchParams:{
    [key:string]:string | string[] | undefined
  }
}
const Design = async({searchParams}:PageProps) => {
  const {id} = searchParams

  if (!id || typeof id !== 'string') {
     return notFound()
  }

  const configuration = await db.configuration.findUnique({
        where:{id},
  })
  if (!configuration) {
    return notFound()
  }
  const {imageUrl,width,height}= configuration;
  // console.log(id);
  
  return <></>
  // <DesignConfigurator configId={``} imageUrl={``}/>
}

export default Design;
