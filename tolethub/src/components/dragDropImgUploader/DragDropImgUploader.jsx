import React, { useRef, useState,useEffect } from 'react'
import { useLocation,Navigate, useNavigate } from 'react-router-dom';
import './DragDropImgUploader.scss'
import axios from 'axios';

const DragDropImgUploader = () => {

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate()

    const selectFiles = () => {
        fileInputRef.current.click();
    }

    const onFileSelect = (event) => {
        const files = event.target.files;
        if(files.length === 0) return ;
        for(let i = 0; i < files.length; i++){
            if(files[i].type.split('/')[0] != 'image') continue;
            if(!images.some((e) => e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages, 
                    {
                        name : files[i].name,
                        url : URL.createObjectURL(files[i])
                    },
                ]);
            }
        }
    }

    function deleteImage(index){
        setImages((prevImages) => 
            prevImages.filter((_, i) => i !== index)
            
            
        );

       // console.log(images)

        

       // console.log(index)
    }

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "Copy";
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
       // const files = event.dataTransfer.files;
    }

    const onDrop = (event) => {

        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;

        for(let i = 0; i < files.length; i++){
            if(files[i].type.split('/')[0] != 'image') continue;
            if(!images.some((e) => e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages, 
                    {
                        name : files[i].name,
                        url : URL.createObjectURL(files[i])
                    },
                ]);
            }
        }




    }

    const proID = useLocation().pathname.split('/')[3];
    //console.log("location : ", location)
    let postPropertyImg;

    // useEffect(() => (
    //     postPropertyImg()
    // ),[])

    const updoadImages = () => {
        console.log("Images : ", images)

      

         postPropertyImg =  async () => {
            try{

                const ImgUploadRes = await axios.post(`http://localhost:8000/property/img/${proID}`, {images})
                
            }catch(err){
                console.log(err)
            }
        }

        postPropertyImg()


        navigate("/");

       




        
    }



  return (
    <div className='card'>
        <div className="top">
            <p>Select sweetable Img for your Property</p>
        </div>

        <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>

            {isDragging ? (

            <span className="select">
                Drop images here
            </span>

            ) : (

                <>
                    Drag & Drop image here or {" "}

                    <span className="select" role='button' onClick={selectFiles}>
                        Browse
                    </span>
                
                </>

            )}

            <input  type='file' className="file" multiple ref={fileInputRef}  onChange={onFileSelect} />
        </div>

        <div className="container">

            {images.map((images, index) => (

            <div className="image" key={index}>
                <span className="delete"  onClick={() => deleteImage(index)}>&times;</span>
                <img src={images.url} alt={images.name} />
            </div>

            ))}
           

        </div>

        <button type='button' onClick={updoadImages}>
            Upload
        </button>

    </div>
  )
}

export default DragDropImgUploader