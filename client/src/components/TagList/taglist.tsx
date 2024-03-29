import React, { useState, useEffect, useRef} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { Wrapper, Content } from './taglist.styles';

interface IProps {
    photoTags: string[],
    photoId: string
}

const TagList = ({photoTags, photoId} : IProps) => {
    const [tags, setTags] = useState<string[]>(photoTags);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
          inputRef.current?.focus();
        }
      }, [inputVisible]);

    useEffect(() => {
        const saveTags = async () => {
            let encodedPhotoId = encodeURIComponent(photoId)
            
            await fetch(`/api/saveTags/${encodedPhotoId}`, {
                method: 'POST',
                body: JSON.stringify(tags),
                headers: {
                    'Content-type':'application/json; charset=UTF-8'
                }
            }).catch(error => {
                console.log(error);
            });
        }

        if(tags && tags.length > 0)
        {
            saveTags();
        }
    }, [tags, photoId]);

    const showInput = () => {
        setInputVisible(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputConfirm = () => {
        if(inputValue && tags !== undefined && tags.indexOf(inputValue) === -1 ) {
            setTags([...tags, inputValue]);
        }
        else if(!tags && inputValue){
            setTags([inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    }

      const handleDeleteTag = (removedTag: string) => {
        const newTagList = tags.filter( (tag: string) => tag !== removedTag);
        setTags(newTagList);
      }

      return (
        <Wrapper>
            <Content>
                <TweenOneGroup enter={{scale: 0.8, opacity: 0, type:'from', duration: 100}} leave={{opacity:0, width:0, scale:0, duration: 200}} appear={false}
                    onEnd={e => {
                        if(e.type==='appear' || e.type==='enter') {
                            (e.target as any).style = 'display: inline-block';
                        }
                    }}
                >
                    {tags ? tags.map((tag: string) => (
                        <span key={tag} className='tag-span'>
                            <Tag closable onClose={e => {e.preventDefault(); handleDeleteTag(tag);}}>
                                {tag}
                            </Tag>
                        </span>
                    )) : null}

                </TweenOneGroup>
            </Content>
                { inputVisible ? (
                    <Input ref={inputRef} type="text" size="small" placeholder='new tag' style={{width:130, height:27}} value={inputValue} onChange={handleInputChange} onBlur={handleInputConfirm} onPressEnter={handleInputConfirm} />
                ) : null}
                { !inputVisible ? (
                    <Tag onClick={showInput} className="site-tag-plus add-tag-button">
                        <PlusOutlined /> Add Tag
                    </Tag>
                ) : null}
        </Wrapper>
      )
}

export default TagList;