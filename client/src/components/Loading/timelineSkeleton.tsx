import React from 'react';
import { Skeleton } from 'antd';
import { Wrapper, Content } from '../../pages/TimelineGrid/timelineGrid.styles';

const TimelineLoadingSkeleton = () => {


    return (
        <Wrapper>
            <h3>Timeline</h3>
            <div className='divider'></div>
            <Content>
                {/* <div key={date + "_" + Math.random()} style={{width:'100%'}}>
                                        <h4 className="header-date"><Moment format="D MMMM YYYY">{date}</Moment></h4>
                </div>
                <div key={photo.asset_id} onClick={() => handleModalOpen(photo.public_id)}>
                                                <PhotoThumbnail alt='photo-thumbnail' photo={photo}/>

                                                
                </div> */}
            </Content>
        </Wrapper>
    );

}

export default TimelineLoadingSkeleton;