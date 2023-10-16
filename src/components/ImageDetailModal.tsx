import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

interface IImageDetailModalProps {
  imageAlt: string;
  imageUrl: string;
  isLoading: boolean
}

export const ImageDetailModal = ({ imageAlt, imageUrl, isLoading }: IImageDetailModalProps) => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl)

  useEffect(() => {
    setImageSrc(imageUrl)
  }, [imageUrl])
  
  return <div data-testid="ImageDetailModal-wrapper" className={`flex inset-0 justify-center items-center m-auto bg-black/40 ${imageSrc ? 'fixed' : 'hidden'}`}>
    <div className="relative border rounded-lg p-2 max-w-2xl bg-white">
      <button className='absolute -top-4 -right-4 bg-white p-1 rounded-full' onClick={() => setImageSrc('')}><RxCross2 size={20} /></button>
      { isLoading ? <BiLoader data-testid="ImageDetailModal-loader" className='animate-spin' size={64} /> : <img className="w-full h-full" src={imageSrc} alt={imageAlt} /> }
    </div>
  </div>
}