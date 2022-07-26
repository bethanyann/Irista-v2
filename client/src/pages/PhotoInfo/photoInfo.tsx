import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; //this is how you get the movieId prop from the router
import Moment from 'react-moment';
import { Modal } from 'antd';
//hooks
import { usePhotoInfoFetch } from '../../hooks/usePhotoInfoFetch';
//styling
import { Content, Metadata } from './photoInfo.styles';
import './modal.css';
//images
import aperture from '../../images/icons/aperture.png';

const PhotoInfo = () => {
    const { photoId } = useParams();
    const [ isOpen, setIsOpen ] = useState(photoId ? true : false);

    const { photo, loading, error} = usePhotoInfoFetch(photoId!);

    debugger;
    //check if photo.image_metadata mapped

    return (
            <Modal
            className='ant-modal'
            onCancel={() => setIsOpen(false)}
            visible={isOpen}
            >
                <Content>
                    <div className={photo.height > photo.width ? "photo-vertical" : "photo-horizontal"}>
                        <img className={photo.height > photo.width ? "img-vertical" : "img-horizontal"} alt={photo.public_id} src={photo.secure_url}/>
                    </div>
                    <Metadata>
                        <div className="info-row">
                            <h2>Information</h2>
                            <p className='smaller-font'>File</p>
                                <p>{photo.original_filename + "." + photo.format}</p>
                            <p className='smaller-font'> Date</p>
                                <p><Moment date={photo.created_at} format="MM/DD/YYYY"/></p>
                                <div className="three-column">
                                    <p className='smaller-font' style={{width:'50px'}}>Format</p>
                                    <p className='smaller-font' style={{width:'110px'}}>Size</p>
                                    <p className='smaller-font' style={{width:'120px'}}>Dimensions</p>
                                </div>
                                <div className="three-column">
                                    <p style={{width:'50px', textTransform:'uppercase'}}>{photo.format}</p>
                                    <p style={{width:'110px'}}>{photo.bytes / 1000} KB</p>
                                    <p style={{width:'120px'}}>{photo.width + "x" + photo.height}</p>
                                </div>
                            <div className='divider'></div>
                            <p className='smaller-font'>Camera</p>
                                 {/* <p>{photo.image_metadata.model ?? "----"}</p>  */}
                            <p className='smaller-font'>Lens</p>
                                 {/* <p>{photo.image_metadata.lensInfo ? photo.image_metadata.lensInfo + ", " + photo.image_metadata.lensMake : "----"}</p> */}
                            <div className='divider'></div>
                            <h4>EXIF</h4>
                                <div className="two-column">
                                    <div className='first-column'>
                                        <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Aperture</p>
                                            <p>{photo.image_metadata.apertureValue ?? "----"}</p>
                                        </div>
                                    </div>
                                    <div className='second-column'>
                                    <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Shutter Speed</p>
                                            <p>{photo.image_metadata.shutterSpeedValue ?? "----"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="two-column">
                                    <div className='first-column'>
                                        <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Focal Length</p>
                                            <p>{photo.image_metadata.focalLength ?? "----"}</p>
                                        </div>
                                    </div>
                                    <div className='second-column'>
                                    <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>ISO</p>
                                            <p>{photo.image_metadata.iso ?? "----"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="two-column">
                                    <div className='first-column'>
                                        <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>White Balance</p>
                                            <p>{photo.image_metadata.whiteBalance ?? "----"}</p>
                                        </div>
                                    </div>
                                    <div className='second-column'>
                                    <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Flash</p>
                                            <p>{photo.image_metadata.flash ?? "----"}</p>
                                        </div>
                                    </div> 
                                </div>
                            <div className='divider'></div>
                            <h4>Tags</h4>
                            {photo.tags ? photo.tags.map(tag => (
                                <button style={{color:'black'}}>{tag}</button>
                            )): null}
                            <div className='divider'></div>
                            <h4>Colors</h4>
                            {photo.colors ? photo.colors.colorPair.map(color => (
                                <button style={{backgroundColor: `${color[0]}`}}></button>
                            )): null}
                        </div>
                    </Metadata>
                </Content>
            </Modal> 
    )
}

export default PhotoInfo;