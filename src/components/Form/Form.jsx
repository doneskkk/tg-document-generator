import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [objectName, setObjectName] = useState('')
    const [address, setAddress] = useState('')
    const [typeObject, setTypeObject] = useState('Видеонаблюдение')
    const {tg} = useTelegram();

    const onSendData = useCallback( () => {
        const data = {
            objectName,
            address,
            typeObject,
        }
        tg.sendData(JSON.stringify(data))
    }, [objectName, address, typeObject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    },[onSendData])
    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Сгенерировать документ'
        })
    }, [])

    useEffect( () => {
        if(!objectName || !address) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    },[objectName, address])
    const onChangeObjectName = (e) => {
        setObjectName(e.target.value)
    }
    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const onChangeType = (e) => {
        setTypeObject(e.target.value)
    }
    return (
        <div>
            <div className={"form"}>
                <h3>Введите ваши данные</h3>
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Название проекта'}
                    value={objectName}
                    onChange={onChangeObjectName}
                />
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Адрес'}
                    value={address}
                    onChange={onChangeAddress}
                />
                <select value={typeObject} onChange={onChangeType} className={'select'}>
                    <option value={'Видеонаблюдение'}>Видеонаблюдение</option>
                    <option value={'Пожар'}>Пожар</option>
                </select>
            </div>
        </div>
    );
};

export default Form;