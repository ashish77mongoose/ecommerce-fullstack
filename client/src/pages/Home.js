import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/api'
import { toast } from 'react-toastify'
import ToastMsg from '../components/toast/ToastMsg'
import { imageRender } from '../utils/helpers'

const Home = () => {
    const [categories,setCategories]=useState([])
    const getAllCategories = async()=>{
        try {
            const res=await getCategories();
            const {status,data}=res;
            if(status>=200&&status<=300){
                setCategories(data)
            }else{
                toast.error(<ToastMsg title={data.message}/>)
            }    
        } catch (error) {
            toast.error(<ToastMsg title={error.response.data.message}/>)
            
        }

    }
    useEffect(()=>{
        getAllCategories()
    },[])
    console.log(categories,'categories')
  return (
    <section className=''>
        <div className="container">
            <header className='py-4'>
                <h4 className='heading-3'>Top Categories</h4>
            </header>
            <div className="grid grid-cols-4 gap-6">

                {categories.map((category)=>(
                    <div key={category._id} className='shadow-card border-c rounded-lg'>
                        <div className='h-60 w-full relative overflow-hidden rounded-t-lg '>
                            <img className='hoverable-img' src={imageRender(category.icon)} alt={category.title} />
                        </div>
                        <div className='py-4 text-center'>
                            <h4 className='heading-4'>{category.name}</h4>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    </section>
  )
}

export default Home
