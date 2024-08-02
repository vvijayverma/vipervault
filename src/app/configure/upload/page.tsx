"use client";
import { cn } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const {toast} = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [progress, setProgress] = React.useState(0);
  const router = useRouter();

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500);
  //   return () => clearTimeout(timer);
  // }, []);

  const {startUpload,isUploading}=useUploadThing("imageUploader",{
    onClientUploadComplete:([data])=>{
      const configId = data.serverData.configId
      startTransition(()=>{
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles:FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false)
    toast({
      title:`${file.file.type} type is not supported`,
      description: "Please chose a PNG,JPG or JPEG image instead",
      variant:"destructive"
    })
  };

  const onDropAccepted = (accceptedFiles : File[]) => {
    startUpload(accceptedFiles,{configId:undefined})
    setIsDragOver(false)
    // console.log("acccepted",accceptedFiles);
  };
  // const isUploading = false;
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        `relative h-full w-full flex-1 my-16 rounded-xl
     bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl
     flex flex-col justify-center items-center`,
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col justify-center items-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex flex-1 items-center justify-center
            flex-col"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Image className="h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm
              text-zinc-700">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <p>Uploading...</p>
                  <Progress
                    value={progress}
                    className="w-40 h-2 mt-2 bg-gray-300"
                  />
                </div>
              ) : isPending ? (
                <div className="flex flex-col items-center">
                  <p>Redirecting, please wait...</p>
                </div>
              ) : isDragOver ? (
                <p className="font-semibold">
                  Drop file<span> to upload</span>
                </p>
              ) : (
                <p className="font-semibold">
                  Click to upload
                  <span className="text-blue-400"> or drag and drop</span>
                </p>
              )}
              </div>
              {isPending ? null : <p className="text-xs text-zinc-500">PNG,JPG,JPEG</p>}
            </div>      
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
