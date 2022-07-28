import React from 'react';
import Moment from 'react-moment';
import { Modal } from 'antd';
//hooks
import { usePhotoInfoFetch } from '../../hooks/usePhotoInfoFetch';
//styling
import { Content, Metadata, ColorButton } from './photoInfo.styles';
import './modal.css';
//components
import TagList from '../../components/TagList/taglist';
//images
import aperture from '../../images/icons/aperture.png';
import whitebalance from '../../images/icons/whitebalance.png';
import focallength from '../../images/icons/focallength.png';
import shutterspeed from '../../images/icons/shutterspeed.png';
import flash from '../../images/icons/flash.png';
import iso from '../../images/icons/iso.png';

interface Props {
    visible: boolean;
    photoId: string;
    onClose: () => void;
}

const PhotoInfo = ({visible, photoId, onClose} : Props) => {
    
    const { photo, loading, error} = usePhotoInfoFetch(photoId!);
    let formattedDate = null;

    //console.log(photo.image_metadata);

    const colorArray: string[] = [];
    if(typeof(photo.colors) == "object"){
        for(var i = 0; i < photo.colors.length; i++) {
            colorArray.push(photo.colors[i][0]);
        }
    }

    if(photo.image_metadata?.CreateDate !== undefined) {
        const date = photo.image_metadata.CreateDate.slice(0,10);
        formattedDate = date.replace(/:/g,"-")
        //console.log(formattedDate);
    }

    return (
        
            <Modal
            className='ant-modal'
            onCancel={() => onClose()}
            visible={visible}
            bodyStyle={{overflowY:'scroll'}}
            >
            { loading ? <div> loading. .. . . .. </div> : 
                <Content>
                    <div className={photo.height > photo.width ? "photo-vertical" : "photo-horizontal"}>
                        <img className={photo.height > photo.width ? "img-vertical" : "img-horizontal"} alt={photo.public_id} src={photo.secure_url}/>
                    </div>
                    <Metadata>
                        <div className="info-row">
                            <h2>Information</h2>
                            <p className='smaller-font'>Filename</p>
                                <p>{photo.original_filename + "." + photo.format}</p>
                            <p className='smaller-font'> Date Created</p>
                                <p><Moment date={formattedDate ?? photo.created_at} format="MM/DD/YYYY"/></p>
                                <div className="three-column">
                                    <p className='smaller-font' style={{width:'50px'}}>Format</p>
                                    <p className='smaller-font' style={{width:'110px'}}>Size</p>
                                    <p className='smaller-font' style={{width:'120px'}}>Dimensions</p>
                                </div>
                                <div className="three-column">
                                    <p style={{width:'50px', textTransform:'uppercase'}}>{photo.format}</p>
                                    <p style={{width:'110px'}}>{photo.bytes / 1000} KB</p>
                                    <p style={{width:'120px'}}>{photo.width + " x " + photo.height}</p>
                                </div>
                            <div className='divider'></div>
                            <div className="two-column">
                                <div>
                                    <p className='smaller-font'>Camera</p>
                                    <p>{photo.image_metadata?.Model ?? "----"}</p>  
                                </div>
                                <div>
                                    <p className='smaller-font'>Lens</p>
                                    <p>{photo.image_metadata?.LensInfo ? photo.image_metadata.LensInfo + ( photo.image_metadata.LensMake ? ", " + photo.image_metadata.LensMake  : ""  ) : "----"}</p> 
                                </div>    
                            </div>                         
                            <div className='divider'></div>
                            <h4>LOCATION</h4>
                            <div className='divider'></div>
                            <h4>EXIF</h4>
                                <div className="two-column">
                                    <div className='first-column'>
                                        <img src={aperture} alt='aperture-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Aperture</p>
                                            <p>{photo.image_metadata?.ApertureValue ?? "----"}</p>
                                        </div>
                                    </div>
                                    <div className='second-column'>
                                    <img src={shutterspeed} alt='shutter-speed-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Shutter Speed</p>
                                            <p>{photo.image_metadata?.ShutterSpeedValue ?? "----"}</p>
                                        </div>
                                    </div>
                                </div> 
                                <div className="two-column">
                                    <div className='first-column'>
                                        <img src={focallength} alt='focal-length-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Focal Length</p>
                                            <p>{photo.image_metadata?.FocalLength ?? "----"}</p>
                                        </div>
                                    </div>
                                    <div className='second-column'>
                                    <img src={iso} alt='iso-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>ISO</p>
                                            <p>{photo.image_metadata?.ISO ?? "----"}</p>
                                        </div>
                                    </div>
                                </div> 
                                <div className="two-column">
                                    <div className='first-column'>
                                        <img src={whitebalance} alt='white-balance-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>White Balance</p>
                                            <p>{photo.image_metadata?.WhiteBalance ?? "----"}</p>
                                        </div>
                                    </div>
                                    <div className='second-column'>
                                    <img src={flash} alt='flash-icon' className='icon'/>
                                        <div>
                                            <p className='smaller-font'>Flash</p>
                                            <p>{photo.image_metadata?.Flash ?? "----"}</p>
                                        </div>
                                    </div> 
                                </div>
                            <div className='divider'></div>
                            <h4>TAGS</h4>
                            {
                                photo.tags ? <TagList photoTags={photo.tags} /> : null
                            }
                            <div className='divider'></div>
                            <h4>COLORS</h4>
                             {colorArray ? colorArray.map(color => (
                                <ColorButton key={color} color={color}><span className='colorName'>{color.toString()}</span></ColorButton>
                            )): null } 
                        </div>
                    </Metadata>
                </Content>
                }
            </Modal> 
    )
}

export default PhotoInfo;