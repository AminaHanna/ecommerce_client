import { useEffect, useState } from "react";
import ViewComponent from "../../components/ViewComponent/ViewComponent";
import InputField from "../../components/Forms/InputField/InputField";
import { EditProduct, addProducts, deleteProduct, fetchProducts } from "../../api/admin";
import { errorToast } from "../../components/Toast";
import axios from "axios";
import {Avatar} from "@mui/material"


function Product() {
  const [formFiled, setFormField] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState({status:false,id:null});
  const [image,setImage] = useState(null)
  const [imagePreview,setImagePreview] = useState(null)
  const [isEditFormData, setIsEditFormData] = useState({profile:null,name:null,details:null,price:null});
  const [products,setProducts] = useState([])


  const formdatas = [
    {
      type: "text",
      placeholder: "Name",
      className: "",
      name: "name",
    },
    {
      type: "price",
      placeholder: "Price",
      className: "",
      name: "price",
    },
    {
      type: "quantity",
      placeholder: "Quantity",
      className: "",
      name: "quantity",
    },
    {
      type: "text",
      placeholder: "Desciption",
      className: "",
      name: "details",
    },
  ];

  const onChangeValues = (e) => {
    setFormField({ ...formFiled, [e.target.name]: e.target.value });
  };

  // const handleImageSubmit  = 

  const handleSubmit = async(e) => {
    e.preventDefault();

    // callapi for add product
    console.log(formFiled);
    // return true

    const formdata = new FormData()

    formdata.append("name",formFiled.name)
    formdata.append("price",formFiled.price)
    formdata.append("details",formFiled.details)
    formdata.append("profile",image)


    try{
    // const response = await addProducts(formdata)


    const response = await axios.post("http://localhost:3000/api/products",formdata);
    console.log(response,'response');

    setRefresh(!refresh)


    console.log(formFiled,'form');

  } catch (error) {
    errorToast(error.message)
  }
  };

  const headings = {
    headingOne: "Profile",
    headingTwo: "Name",
    headingFour: "Price",
  };

  const handleClickView = (e) => {
    console.log(e, "ee");
    console.log("object");
  };

  console.log(products,'products');
  const onclickEdit = (e) => {
    console.log(e,'ee');
    setIsEdit({status:true,id:e})

    // return true

    const editData =  products.find((item)=>{
      console.log(item._id,'item');
      console.log(e,'edit');
      if(item._id === e ){
        return true
      }else{
        return null
      }
    })

    console.log(editData,'editdata');
    setIsEditFormData(editData)

    // setRefresh(!refresh)
  };

  console.log(isEditFormData,"kkk");

  const onclickDelete =async (id) => {
// return alert(id)
    try{
      await axios.delete(`http://localhost:3000/api/products/${id}`)
      setRefresh(!refresh)
    } catch(error){
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchData()
  },[refresh])
  
  const fetchData = async()=>{
    try {
      
      const response = await fetchProducts()
      console.log(response.data.products,'response');

      setProducts(response.data.products)
    } catch (error) {
      errorToast(error.message)
    }

  }

  const handleEdit = async(e)=>{
    console.log(e,'ee')
    e.preventDefault();

    await axios.put(`http://localhost:3000/api/products/${isEdit.id}`,isEditFormData)
    setRefresh(!refresh)
    //edit btn refresh aakm into "add to cart"
    setIsEdit({status:false,id:null})
  }

  const handleEditChange = (e)=>{
    setIsEditFormData({[e.target.name]:e.target.value})
  }



  // const handleEditChange = (e) => {
  //   if (e.target.type === "file") {
  //     // Handle file input separately
  //     setImage(e.target.files[0]);
  //     setImagePreview(URL.createObjectURL(e.target.files[0]));
  //   } else {
  //     // Handle text inputs
  //     setIsEditFormData({ ...isEditFormData, [e.target.name]: e.target.value });
  //   }
  // };





    const  handleChangeImage = (e)=>{
        console.log(e.target.files[0],'ee');
        setImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }


return (
    <div>
      <div>
        <h1 className="text-white">Products</h1>
        <div className="mx-52">
        <Avatar alt="Remy Sharp"  src={imagePreview} style={{width:"100px",height:"100px"}}  />
        <input type="file" name="" onChange={handleChangeImage} id="" accept="image/*" />
        {/* <Button onClick={handleSubmit} variant="contained">Submit</Button> */}
       </div>
        <table className=" w-[80%] m-auto">
        <tr className="">
        <th className="text-white">PROFILE</th>
          <th className="text-white">NAME</th>
          <th className="text-white">DETAILS</th>
          <th className="text-white">PRICE</th>
        </tr>
        
        {products.map(
          (
            {
              profile,
              name,
              details,
              price,
              _id,
            },
            index
          ) => {
            return (
              <tr key={index} className="text-center">
                <td className="">
                  <img style={{width:"80px",height:"80px",borderRadius:"50%"}} src={`http://localhost:3000/${profile}`}/>
                </td>
                <td className="text-white">{name}</td>
                {/* <td className="text-white">{_id}</td> */}
                <td className="text-white">{details}</td>
                <td className="text-white">{price}</td>
                <td className="text-green-600" onClick={() => {
                  onclickEdit(_id)
                  // alert(_id)
                }}>
                  Edit
                </td>
                <td className="text-red-500" onClick={() => {
                  onclickDelete(_id)
                  // alert(_id)
                }}>
                  Remove
                </td>
              </tr>
            );
          }
        )}
      </table>
      </div>
      <div className="flex justify-center items-center flex-col h-screen">

        {

          isEdit.status  ?

          <>


          <form action="" onSubmit={handleEdit} 
          className="w-[50%] rounded-md h-[500px] flex justify-center flex-col gap-5 items-center pb-[40%]"
          
          >
            <div className=" text-xl">
            <h1>Edit Product</h1>
            
              {/* <input type="file" placeholder="img" name="profile" onChange={handleEditChange}/> */}
              <input type="text" placeholder="name" name="name" onChange={handleEditChange}  value={isEditFormData?.name}/>
              <input type="text" placeholder="price" name="price" onChange={handleEditChange}  value={isEditFormData?.price} />
              <input type="text" placeholder="details" name="details" onChange={handleEditChange} value={isEditFormData?.details} />
              <input type="submit" className="bg-black text-white"/>
            </div>
          </form>

         </>
          :

          <>
          
          <form
          onSubmit={handleSubmit}
          action=""
          className="w-[50%] rounded-md h-[500px] flex justify-center flex-col gap-5 items-center pb-[40%]"
        >
          <h2 className="text-white text-xl">Add Product</h2>
          {

          }
          {formdatas.map(({ className, placeholder, type, name }, index) => (
            <InputField
              onChange={onChangeValues}
              key={index}
              type={type}
              placeholder={placeholder}
              name={name}
              className={`${className} max-w-[300px] w-[80%] h-[60px] bg-white flex justify-start ps-5 rounded-md items-center`}
            />
          ))}
          <input
            type="submit"
            className="text-white border-solid border-2 border-indigo-600 w-[4  0%]"
          />
        </form>
          
          </>

        }
      </div>
    </div>
  );
}

export default Product;