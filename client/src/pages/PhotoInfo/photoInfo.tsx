import React, { useRef, useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Modal, Space, Tooltip, Button } from 'antd';
import { EditTwoTone, EditOutlined } from '@ant-design/icons';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import FolderAddOutlined from '@ant-design/icons/FolderAddOutlined';
//hooks
import { usePhotoInfoFetch, PhotoState } from '../../hooks/usePhotoInfoFetch';
//styling
import { Content, Metadata, ColorButton } from './photoInfo.styles';
import './modal.css';
//components
import TagList from '../../components/TagList/taglist';
import Scrollbar from '../../components/shadowScrollbar';
import GoogleMap from '../../components/GoogleMap/map';
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
// TODO - put the image preview in here as well as the skeleton to load before the images come in
// is there a way to do a component will render with hooks? like, put in the skeleton before the images are fetched? 
const PhotoInfo = ({visible, photoId, onClose} : Props) => {

    const { photo, setPhoto, loading, error} = usePhotoInfoFetch(photoId!);
    const [ openDeleteAlert, setOpenDeleteAlert ] = useState(false);

    let formattedDate = null;

    //only allow top 20 colors to be displayed 
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
            >
            { loading ? <div> loading. .. . . .. </div> : 
                <Content>
                    <div className={photo.height > photo.width ? "photo-vertical" : "photo-horizontal"}>
                        <img className={photo.height > photo.width ? "img-vertical" : "img-horizontal"} alt={photo.public_id} src={photo.secure_url}/>
                    </div>
                    <Metadata>
                    <Scrollbar
                        style={{height: "89vh", right: 0}}
                    >
                        <div className="info-row">
                          <p className='smaller-font'>Filename</p>   
                            <p>{ photo.public_id?.substring(photo.public_id.lastIndexOf('/') + 1) + "." + photo.format}</p>
                            <p className='smaller-font'> Date Created</p>
                                <p><Moment date={formattedDate ?? photo.created_at} format="MM/DD/YYYY"/></p>
                                <div className="three-column">
                                    <p className='smaller-font' style={{width:'55px'}}>Format</p>
                                    <p className='smaller-font' style={{width:'110px', marginLeft:'10px'}}>Size</p>
                                    <p className='smaller-font' style={{width:'120px', marginLeft:'10px'}}>Dimensions</p>
                                </div>
                                <div className="three-column">
                                    <p style={{width:'55px', textTransform:'uppercase'}}>{photo.format}</p>
                                    <p style={{width:'110px', marginLeft:'10px'}}>{Math.round(photo.bytes / 1000)} KB</p>
                                    <p style={{width:'120px', marginLeft:'10px'}}>{photo.width + " x " + photo.height}</p>
                                </div>
                                <p className='smaller-font'>Actions</p>
                                <Space>
                                    {
                                        <>
                                            <Tooltip title="Add to folder" placement="bottomRight">
                                                <Button className="album-button" disabled={true} icon={<FolderAddOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                            </Tooltip>
                                            <Tooltip title="Toggle Favorite" placement="bottomRight">
                                                <Button className="album-button" disabled={true} icon={<HeartOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                            </Tooltip>
                                            <Tooltip title="Download" placement="bottomRight">
                                                <Button className="album-button" disabled={true} icon={<DownloadOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="bottom">
                                                <Button className="album-button"  onClick={() => setOpenDeleteAlert(true)} icon={<DeleteOutlined className="action-icon" />} size="large"/>
                                            </Tooltip>
                                        </>
                                    }     
                                </Space>      
                            <div className='divider'></div>
                            <div className="two-column">
                                <div>
                                    <p className='camera-lens'>Camera</p>
                                    <p>{photo.image_metadata?.Model ?? "----"}</p>  
                                </div>
                                <div>
                                    <p className='camera-lens'>Lens</p>
                                    <p>{photo.image_metadata?.LensInfo ? photo.image_metadata.LensInfo + ( photo.image_metadata.LensMake ? ", " + photo.image_metadata.LensMake  : ""  ) : "----"}</p> 
                                </div>    
                            </div>                         
                            <div className='divider'></div>
                            <h4>LOCATION</h4>
                            {/* <GoogleMap /> */}
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
                    </Scrollbar> 
                    </Metadata>
                </Content>
                }
            </Modal> 
    )
}

export default PhotoInfo;