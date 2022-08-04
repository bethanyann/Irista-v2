import React, { useRef, useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Modal, Input, InputRef } from 'antd';
import { EditTwoTone, EditOutlined } from '@ant-design/icons';
//hooks
import { usePhotoInfoFetch, PhotoState } from '../../hooks/usePhotoInfoFetch';
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
    // const [inputVisible, setInputVisible] = useState<boolean>(false);
    // const [inputValue, setInputValue] = useState('');
    // const inputRef = useRef<InputRef>(null);
    const { photo, setPhoto, loading, error} = usePhotoInfoFetch(photoId!);
    
    let formattedDate = null;

    // useEffect(() => {
    //     if (inputVisible) {
    //       inputRef.current?.focus();
    //     }
    //   }, [inputVisible]);
    
    //control how many colors are being displayed here
    const colorArray: string[] = [];
    if(typeof(photo.colors) == "object"){
        for(var i = 0; i < photo.colors.length; i++) {
            if(i === 20) break;
            colorArray.push(photo.colors[i][0]);
        }
    }

    //disgard the time info and just grab the date & format 
    if(photo.image_metadata?.CreateDate !== undefined) {
        const date = photo.image_metadata.CreateDate.slice(0,10);
        formattedDate = date.replace(/:/g,"-")
    }

    return (
        
            <Modal
            className='ant-modal-large'
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
                            {/* {
                                inputVisible ? (
                                    <>
                                    <Input ref={inputRef}  type="text" style={{width:200, height:27}} value={inputValue} onChange={handleInputChange} onPressEnter={handleInputConfirm} onBlur={handleInputConfirm} placeholder={photo.public_id ?? photo.filename ?? photo.original_filename}/>
                                    <span style={{fontSize:'1.3em', marginLeft:'2px'}}>{"." + photo.format} <EditTwoTone twoToneColor="#26cfa2" onClick={showInput} style={{marginLeft:'5px'}} /></span>
                                    </>
                                ) : null
                            } */}
                               
                            <p>{(photo.public_id.substring(0, photo.public_id.lastIndexOf('/') + 1) ?? photo.filename ?? photo.original_filename) + "." + photo.format}</p>
                            <p className='smaller-font'> Date Created</p>
                                <p><Moment date={formattedDate ?? photo.created_at} format="MM/DD/YYYY"/></p>
                                <div className="three-column">
                                    <p className='smaller-font' style={{width:'50px'}}>Format</p>
                                    <p className='smaller-font' style={{width:'110px', marginLeft:'10px'}}>Size</p>
                                    <p className='smaller-font' style={{width:'120px', marginLeft:'10px'}}>Dimensions</p>
                                </div>
                                <div className="three-column">
                                    <p style={{width:'50px', textTransform:'uppercase'}}>{photo.format}</p>
                                    <p style={{width:'110px', marginLeft:'10px'}}>{Math.round(photo.bytes / 1000)} KB</p>
                                    <p style={{width:'120px', marginLeft:'10px'}}>{photo.width + " x " + photo.height}</p>
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
                                 <TagList photoTags={photo.tags} photoId={photo.public_id} />
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