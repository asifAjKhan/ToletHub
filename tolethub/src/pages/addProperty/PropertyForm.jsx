import './propertyForm.scss'

import Navbar from '../../components/navbar/Navbar'
import DragDropImgUploader from '../../components/dragDropImgUploader/DragDropImgUploader';



const PropertyForm = () => {

  return (
    <div className='container'>
      
      <Navbar />
     

    <DragDropImgUploader />


     {/* <div className="right">
        <form>
            {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} />
                </div>
            ))}
            <button>Send</button>
        </form>
      </div> */}



    </div>
  );
};

export default PropertyForm;
